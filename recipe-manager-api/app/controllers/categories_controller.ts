import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index() {
    const categories = await Category.all()
    return categories
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.all()
    const payload = await createCategoryValidator.validate(data)

    const category = new Category()
    await category.fill(payload).save()

    return category
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    return category
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.all()
    const payload = await updateCategoryValidator.validate(data)

    const category = await Category.findOrFail(params.id)
    await category.merge(payload).save()

    return category
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.related('recipes').detach()
    await category.delete()
    return response.status(200).send({})
  }
}
