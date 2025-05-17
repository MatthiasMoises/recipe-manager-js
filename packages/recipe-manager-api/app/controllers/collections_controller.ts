import type { HttpContext } from '@adonisjs/core/http'
import { createCollectionValidator, updateCollectionValidator } from '#validators/collection'
import { CollectionService } from '#services/collection_service'
import { inject } from '@adonisjs/core'
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@foadonis/openapi/decorators'
import Collection from '#models/collection'
import { ApiBearerAuth } from '@foadonis/openapi/decorators'
import CollectionPolicy from '#policies/collection_policy'

@inject()
export default class CollectionsController {
  constructor(protected collectionService: CollectionService) {
    //...
  }

  /**
   * Display a list of resource
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all Collections' })
  @ApiResponse({ status: 200, type: [Collection] })
  async index({ response }: HttpContext) {
    const collections = await this.collectionService.getAll()
    return response.status(200).send(collections)
  }

  /**
   * Display a list of user owned resources
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all Collections owned by the current user' })
  @ApiResponse({ status: 200, type: [Collection] })
  async owned({ response, auth }: HttpContext) {
    const collections = await this.collectionService.getOwnedByUser(auth.user!.id)
    return response.status(200).send(collections)
  }

  /**
   * Show individual record
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List a single Collection' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({ status: 200, type: Collection })
  async show({ params, response }: HttpContext) {
    const collection = await this.collectionService.getOneById(params.id)
    return response.status(200).send(collection)
  }

  /**
   * Handle form submission for the create action
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new Collection' })
  @ApiBody({ type: () => createCollectionValidator })
  @ApiResponse({ status: 201, type: Collection })
  async store({ request, response, auth }: HttpContext) {
    const data = request.all()
    const payload = await createCollectionValidator.validate(data)

    const authenticatedUserId = auth.user?.id

    if (!authenticatedUserId) {
      return response.forbidden({ error: 'Not authorized.' })
    }

    const collection = await this.collectionService.save(payload, authenticatedUserId)
    return response.status(201).send(collection)
  }

  /**
   * Handle form submission for the edit action
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a Collection' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiBody({ type: () => updateCollectionValidator })
  @ApiResponse({ status: 200, type: Collection })
  async update({ params, request, response, bouncer }: HttpContext) {
    const data = request.all()
    const payload = await updateCollectionValidator.validate(data)

    const collection = await this.collectionService.getOneById(params.id)

    if (collection) {
      // Check permission
      if (await bouncer.with(CollectionPolicy).denies('edit', collection)) {
        return response.forbidden({ error: 'Cannot edit this collection' })
      }

      await this.collectionService.update(payload, params.id, collection)
    }

    return response.status(200).send(collection)
  }

  /**
   * Delete record
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a Collection' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({ status: 204, type: 'object' })
  async destroy({ params, response, bouncer }: HttpContext) {
    const collection = await this.collectionService.getOneById(params.id)

    if (collection) {
      // Check permission
      if (await bouncer.with(CollectionPolicy).denies('delete', collection)) {
        return response.forbidden({ error: 'Cannot delete this collection' })
      }

      await collection.delete()

      return response.status(204).send({})
    }
  }

  /**
   * Add to Collection / Recipe Relationship
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a Recipe to a Collection' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiParam({
    name: 'recipeId',
    type: Number,
  })
  @ApiResponse({ status: 200, type: 'object' })
  async addRecipe({ params, response }: HttpContext) {
    const collection = await this.collectionService.addRecipe(params.id, params.recipeId)
    return response.status(200).send(collection)
  }

  /**
   * Remove from Collection / Recipe Relationship
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a Recipe from a Collection' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiParam({
    name: 'recipeId',
    type: Number,
  })
  @ApiResponse({ status: 200, type: 'object' })
  async removeRecipe({ params, response }: HttpContext) {
    const collection = await this.collectionService.removeRecipe(params.id, params.recipeId)
    return response.status(200).send(collection)
  }
}
