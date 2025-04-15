import type { HttpContext } from '@adonisjs/core/http'
import Ingredient from '#models/ingredient'
import { createIngredientValidator, updateIngredientValidator } from '#validators/ingredient'

export default class IngredientsController {
  /**
   * Display a list of resource
   */
  async index() {
    const ingredients = await Ingredient.all()
    return ingredients
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.all()
    const payload = await createIngredientValidator.validate(data)

    const ingredient = new Ingredient()

    await ingredient.fill(payload).save()

    return ingredient
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const ingredient = await Ingredient.find(params.id)
    return ingredient
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.all()
    const payload = await updateIngredientValidator.validate(data)

    const ingredient = await Ingredient.findOrFail(params.id)

    await ingredient.merge(payload).save()

    return ingredient
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const ingredient = await Ingredient.findByOrFail(params.id)
    await ingredient.related('recipe').detach()
    await ingredient.delete()

    return response.status(200).send({})
  }
}
