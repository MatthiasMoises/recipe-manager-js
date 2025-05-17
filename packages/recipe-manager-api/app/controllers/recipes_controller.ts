import type { HttpContext } from '@adonisjs/core/http'
import {
  createRecipeValidator,
  findRecipeByNameValidator,
  updateRecipeValidator,
} from '#validators/recipe'
import RecipePolicy from '#policies/recipe_policy'
import { RecipeService } from '#services/recipe_service'
import { inject } from '@adonisjs/core'
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@foadonis/openapi/decorators'
import Recipe from '#models/recipe'
import { ApiBearerAuth } from '@foadonis/openapi/decorators'

@inject()
export default class RecipesController {
  constructor(protected recipeService: RecipeService) {
    //...
  }

  /**
   * Display a list of resource
   */
  @ApiOperation({ summary: 'List all Recipes' })
  @ApiParam({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiResponse({ status: 200, type: [Recipe] })
  async index({ request, response }: HttpContext) {
    const page: number = request.input('page')

    const recipes = await this.recipeService.getAll(page)
    return response.status(200).send(recipes)
  }

  /**
   * Show individual record by id
   */
  @ApiOperation({ summary: 'List a single Recipe by id' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({ status: 200, type: Recipe })
  async show({ params, response }: HttpContext) {
    const recipe = await this.recipeService.getOneById(params.id)
    return response.status(200).send(recipe)
  }

  /**
   * Show individual record by name
   */
  @ApiOperation({ summary: 'List a single Recipe by name' })
  @ApiBody({ type: () => findRecipeByNameValidator })
  @ApiResponse({ status: 200, type: Recipe })
  async find({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await findRecipeByNameValidator.validate(data)

    const recipe = await this.recipeService.getOnyByName(payload.name)
    return response.status(200).send(recipe)
  }

  /**
   * Handle form submission for the create action
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new Recipe' })
  @ApiBody({ type: () => createRecipeValidator })
  @ApiResponse({ status: 201, type: Recipe })
  async store({ request, response, bouncer, auth }: HttpContext) {
    // Check permission
    if (await bouncer.with(RecipePolicy).denies('create')) {
      return response.forbidden({ error: 'Cannot create a recipe. Please log in first' })
    }

    const data = request.all()
    const payload = await createRecipeValidator.validate(data)

    const authenticatedUserId = auth.user?.id

    if (!authenticatedUserId) {
      return response.forbidden({ error: 'Not authorized.' })
    }

    const recipe = await this.recipeService.save(payload, authenticatedUserId)
    return response.status(201).send(recipe)
  }

  /**
   * Handle form submission for the edit action
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a Recipe' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiBody({ type: () => updateRecipeValidator })
  @ApiResponse({ status: 200, type: Recipe })
  async update({ params, request, response, bouncer }: HttpContext) {
    const data = request.all()
    const payload = await updateRecipeValidator.validate(data)

    const recipe = await this.recipeService.getOneById(params.id)

    if (recipe) {
      // Check permission
      if (await bouncer.with(RecipePolicy).denies('edit', recipe)) {
        return response.forbidden({ error: 'Cannot edit this recipe' })
      }

      await this.recipeService.update(payload, params.id, recipe)
    }

    return response.status(200).send(recipe)
  }

  /**
   * Delete record
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a Recipe' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({ status: 204, type: 'object' })
  async destroy({ params, response, bouncer }: HttpContext) {
    const recipe = await this.recipeService.getOneById(params.id)

    if (recipe) {
      // Check permission
      if (await bouncer.with(RecipePolicy).denies('delete', recipe)) {
        return response.forbidden({ error: 'Cannot delete this recipe' })
      }

      await recipe.related('categories').detach()
      await recipe.related('ingredients').detach()
      await recipe.delete()

      return response.status(204).send({})
    }
    return response.notFound()
  }
}
