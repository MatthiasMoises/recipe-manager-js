import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { HttpContext } from '@adonisjs/core/http'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { UserRole } from '#customtypes/user_role'

export default class UserPolicy extends BasePolicy {
  async before(user: User | null) {
    /**
     * Always allow an admin user without performing any check
     */
    if (user && user.role === UserRole.ADMIN) {
      return true
    }
  }

  userAction(user: User, { auth }: HttpContext): AuthorizerResponse {
    return user === auth.user
  }
}
