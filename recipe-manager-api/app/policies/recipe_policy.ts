import User from '#models/user'
import Recipe from '#models/recipe'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class RecipePolicy extends BasePolicy {
  /**
   * Every logged-in user can create a recipe
   */
  create(user: User): AuthorizerResponse {
    if (user) return true
    return false
  }

  /**
   * Only the post creator can edit the recipe
   */
  edit(user: User, recipe: Recipe): AuthorizerResponse {
    return user.id === recipe.userId
  }

  /**
   * Only the recipe creator can delete the recipe
   */
  delete(user: User, recipe: Recipe): AuthorizerResponse {
    return user.id === recipe.userId
  }
}
