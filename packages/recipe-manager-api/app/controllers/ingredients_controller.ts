import type { HttpContext } from '@adonisjs/core/http'
import { createIngredientValidator, updateIngredientValidator } from '#validators/ingredient'
import { IngredientService } from '#services/ingredient_service'
import { inject } from '@adonisjs/core'
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@foadonis/openapi/decorators'
import Ingredient from '#models/ingredient'
import { ApiBearerAuth } from '@foadonis/openapi/decorators'

@inject()
export default class IngredientsController {
  constructor(protected ingredientService: IngredientService) {
    //...
  }

  /**
   * Display a list of resource
   */
  @ApiOperation({ summary: 'List all Ingredients' })
  @ApiResponse({ status: 200, type: [Ingredient] })
  async index({ response }: HttpContext) {
    const ingredients = await this.ingredientService.getAll()
    return response.status(200).send(ingredients)
  }

  /**
   * Show individual record
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List a single Ingredient' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({ status: 200, type: Ingredient })
  async show({ params, response }: HttpContext) {
    const ingredient = await this.ingredientService.getOneById(params.id)
    return response.status(200).send(ingredient)
  }

  /**
   * Handle form submission for the create action
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new Ingredient' })
  @ApiBody({ type: () => createIngredientValidator })
  @ApiResponse({ status: 201, type: Ingredient })
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createIngredientValidator.validate(data)

    const ingredient = await this.ingredientService.save(payload)
    return response.status(201).send(ingredient)
  }

  /**
   * Handle form submission for the edit action
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an Ingredient' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiBody({ type: () => updateIngredientValidator })
  @ApiResponse({ status: 200, type: Ingredient })
  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await updateIngredientValidator.validate(data)

    const ingredient = await this.ingredientService.update(payload, params.id)

    return response.status(200).send(ingredient)
  }

  /**
   * Delete record
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an Ingredient' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({ status: 204, type: 'object' })
  async destroy({ params, response }: HttpContext) {
    await this.ingredientService.delete(params.id)
    return response.status(204).send({})
  }
}
