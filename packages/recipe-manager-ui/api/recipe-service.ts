import axios from '@/api/client'
import type { Recipe } from '@/types/recipe'

export default class RecipeService {
  static async getAll() {
    try {
      const response = await axios.get<Recipe[]>('/recipes')
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}