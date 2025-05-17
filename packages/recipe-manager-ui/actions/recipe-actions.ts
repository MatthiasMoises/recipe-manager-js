'use server'

import axios from '@/lib/axios'
import { Recipe } from '@/types/recipe'

export const getRecipes = async () => {
  const response = await axios.get<Recipe[]>('/recipes')

  if (!response.status || response.status !== 200) {
    return { message: 'Error fetching recipes' }
  }

  return { data: response.data }
}