import type { RecipeIngredientDTO } from '#customtypes/recipe_ingredient_dtos'

export type CreateRecipeDTO = {
  name: string
  shortDescription?: string
  instructions: string
  numberOfPeople: number
  imageUrl?: string
  cookingTimeInMinutes: number
  restingTimeInMinutes?: number
  difficulty: string
  calories?: number
  userId?: number
  ingredients: Array<RecipeIngredientDTO>
  categories: Array<number>
}

export type UpdateRecipeDTO = {
  name?: string
  shortDescription?: string
  instructions?: string
  numberOfPeople?: number
  imageUrl?: string
  cookingTimeInMinutes?: number
  restingTimeInMinutes?: number
  difficulty?: string
  calories?: number
  userId?: number
  ingredients?: Array<RecipeIngredientDTO>
  categories?: Array<number>
}
