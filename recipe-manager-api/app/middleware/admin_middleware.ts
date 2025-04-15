import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { UserRole } from '#customtypes/user_role'
import { Exception } from '@adonisjs/core/exceptions'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    if (!ctx.auth.user || ctx.auth.user.role !== UserRole.ADMIN) {
      throw new Exception('Aborting request. Missing permissions')
    }

    /**
     * Call next method in the pipeline
     */
    await next()
  }
}
