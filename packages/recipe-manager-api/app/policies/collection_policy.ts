import User from '#models/user'
import Collection from '#models/collection'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CollectionPolicy extends BasePolicy {
  /**
   * Every logged-in user can create a collection
   */
  create(user: User): AuthorizerResponse {
    if (user) return true
    return false
  }

  /**
   * Only the post creator can edit the collection
   */
  edit(user: User, collection: Collection): AuthorizerResponse {
    return user.id === collection.userId
  }

  /**
   * Only the recipe creator can delete the collection
   */
  delete(user: User, collection: Collection): AuthorizerResponse {
    return user.id === collection.userId
  }
}
