import type { HttpContext } from '@adonisjs/core/http'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'
import { CategoryService } from '#services/category_service'
import { inject } from '@adonisjs/core'
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@foadonis/openapi/decorators'
import Category from '#models/category'
import { ApiBearerAuth } from '@foadonis/openapi/decorators'

@inject()
export default class CategoriesController {
  constructor(protected categoryService: CategoryService) {
    //...
  }

  /**
   * Display a list of resource
   */
  @ApiOperation({ summary: 'List all Categories' })
  @ApiResponse({ status: 200, type: [Category] })
  async index({ response }: HttpContext) {
    const categories = await this.categoryService.getAll()
    return response.status(200).send(categories)
  }

  /**
   * Show individual record
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List a single Category' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({ status: 200, type: Category })
  async show({ params, response }: HttpContext) {
    const category = await this.categoryService.getOneById(params.id)
    return response.status(200).send(category)
  }

  /**
   * Handle form submission for the create action
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new Category' })
  @ApiBody({ type: () => createCategoryValidator })
  @ApiResponse({ status: 201, type: Category })
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createCategoryValidator.validate(data)

    const category = await this.categoryService.save(payload)
    return response.status(201).send(category)
  }

  /**
   * Handle form submission for the edit action
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a Category' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiBody({ type: () => updateCategoryValidator })
  @ApiResponse({ status: 200, type: Category })
  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await updateCategoryValidator.validate(data)

    const category = await this.categoryService.update(payload, params.id)
    return response.status(200).send(category)
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
  async destroy({ params, response }: HttpContext) {
    await this.categoryService.delete(params.id)
    return response.status(204).send({})
  }
}
