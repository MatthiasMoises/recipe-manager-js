import type { HttpContext } from '@adonisjs/core/http'
import Recipe from '#models/recipe'
import { createRecipeValidator, updateRecipeValidator } from '#validators/recipe'
import RecipePolicy from '#policies/recipe_policy'

export default class RecipesController {
  /**
   * Display a list of resource
   */
  async index() {
    const recipes = await Recipe.query()
      .preload('ingredients', (query) => {
        query.select('name')
        query.orderBy('id', 'asc')
        query.pivotColumns(['amount', 'unit'])
      })
      .preload('categories', (query) => {
        query.select('id', 'name', 'description', 'thumbnail')
        query.orderBy('id', 'asc')
      })

    return recipes
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, bouncer }: HttpContext) {
    // Check permission
    if (await bouncer.with(RecipePolicy).denies('create')) {
      return response.forbidden({ error: 'Cannot create a recipe. Please log in first' })
    }

    const data = request.all()
    const payload = await createRecipeValidator.validate(data)

    // Save recipe
    const recipe = new Recipe()
    await recipe.fill(payload).save()

    // Save categories
    await recipe.related('categories').attach(payload.categories)

    // Save ingredients
    payload.ingredients.forEach(async (ingredient) => {
      await recipe.related('ingredients').attach({
        [ingredient.id]: {
          amount: ingredient.amount,
          unit: ingredient.unit,
        },
      })
    })

    await recipe.load('categories')
    await recipe.load('ingredients')

    return recipe
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const recipe = await Recipe.query()
      .where('id', params.id)
      .preload('ingredients', (query) => {
        query.select('name')
        query.orderBy('id', 'asc')
        query.pivotColumns(['amount', 'unit'])
      })
      .preload('categories', (query) => {
        query.select('id', 'name', 'description', 'thumbnail')
        query.orderBy('id', 'asc')
      })

    return recipe
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, bouncer }: HttpContext) {
    const data = request.all()
    const payload = await updateRecipeValidator.validate(data)

    const recipe = await Recipe.findOrFail(params.id)

    // Check permission
    if (await bouncer.with(RecipePolicy).denies('edit', recipe)) {
      return response.forbidden({ error: 'Cannot edit this recipe' })
    }

    // Save recipe
    recipe.merge(payload).save()

    // Update categories
    if (payload.categories) {
      await recipe.related('categories').sync(payload.categories)
    }

    // Update ingredients
    await recipe.related('ingredients').detach()

    payload.ingredients.forEach(async (ingredient) => {
      await recipe.related('ingredients').attach({
        [ingredient.id]: {
          amount: ingredient.amount,
          unit: ingredient.unit,
        },
      })
    })

    await recipe.load('ingredients')
    await recipe.load('categories')

    return recipe
  }

  /**
   * Delete record
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    const recipe = await Recipe.findOrFail(params.id)

    // Check permission
    if (await bouncer.with(RecipePolicy).denies('delete', recipe)) {
      return response.forbidden({ error: 'Cannot delete this recipe' })
    }

    await recipe.related('categories').detach()
    await recipe.related('ingredients').detach()
    await recipe.delete()

    return response.status(200).send({})
  }
}
