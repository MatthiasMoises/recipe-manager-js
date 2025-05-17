import { CreateRecipeDTO, UpdateRecipeDTO } from '#customtypes/recipe_dtos'
import { RecipeIngredientDTO } from '#customtypes/recipe_ingredient_dtos'
import Recipe from '#models/recipe'

export class RecipeService {
  async getAll(page?: number) {
    const recipeQuery = Recipe.query()
      .preload('ingredients', (query) => {
        query.select('id', 'name')
        query.orderBy('id', 'asc')
        query.pivotColumns(['amount', 'unit'])
      })
      .preload('categories', (query) => {
        query.select('id', 'name', 'description', 'thumbnail')
        query.orderBy('id', 'asc')
      })
      .orderBy('id', 'desc')

    let recipes

    if (page) {
      recipes = await recipeQuery.paginate(page)
      recipes = recipes.toJSON()
    } else {
      recipes = await recipeQuery
    }

    return recipes
  }

  async getOneById(id: number): Promise<Recipe | null> {
    const recipe = await Recipe.query()
      .where('id', id)
      .preload('ingredients', (query) => {
        query.select('id', 'name')
        query.orderBy('id', 'asc')
        query.pivotColumns(['amount', 'unit'])
      })
      .preload('categories', (query) => {
        query.select('id', 'name', 'description', 'thumbnail')
        query.orderBy('id', 'asc')
      })
      .first()

    return recipe
  }

  async getOnyByName(value: string): Promise<Recipe | null> {
    const recipe = await Recipe.query().whereLike('name', `%${value}%`).first()
    return recipe
  }

  async getOnyBy(key: string, value: string | number): Promise<Recipe | null> {
    const recipe = await Recipe.findByOrFail(key, value)
    return recipe
  }

  async save(recipeData: CreateRecipeDTO, userId: number): Promise<Recipe> {
    const recipe = new Recipe()
    if (!recipeData.userId) {
      recipeData.userId = userId
    }
    await recipe.fill(recipeData).save()

    // Save categories
    await recipe.related('categories').attach(recipeData.categories)

    // Save ingredients
    recipeData.ingredients.forEach(async (ingredient: RecipeIngredientDTO) => {
      await recipe.related('ingredients').attach({
        [ingredient.id]: {
          amount: ingredient.amount,
          unit: ingredient.unit,
        },
      })
    })

    return recipe
  }

  async update(recipeData: UpdateRecipeDTO, id: number, loadedRecipe?: Recipe): Promise<Recipe> {
    let recipe = null

    if (loadedRecipe) {
      recipe = loadedRecipe
    } else {
      recipe = await Recipe.findOrFail(id)
    }

    // Save recipe
    recipe.merge(recipeData).save()

    // Update categories
    if (recipeData && recipeData.categories) {
      await recipe.related('categories').sync(recipeData.categories)
    }

    // Update ingredients
    await recipe.related('ingredients').detach()

    if (recipeData && recipeData.ingredients) {
      recipeData.ingredients.forEach(async (ingredient: RecipeIngredientDTO) => {
        await recipe.related('ingredients').attach({
          [ingredient.id]: {
            amount: ingredient.amount,
            unit: ingredient.unit,
          },
        })
      })
    }

    // Load relationships
    await recipe.load('ingredients')
    await recipe.load('categories')

    return recipe
  }

  async delete(id: number, loadedRecipe?: Recipe): Promise<void> {
    let recipe = null

    if (loadedRecipe) {
      recipe = loadedRecipe
    } else {
      recipe = await Recipe.findOrFail(id)
    }

    await recipe.related('categories').detach()
    await recipe.related('ingredients').detach()
    await recipe.delete()
  }
}
