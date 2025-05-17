import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, loginUserValidator } from '#validators/user'
import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import { ApiOperation, ApiBody, ApiResponse } from '@foadonis/openapi/decorators'
import User from '#models/user'
import { ApiBearerAuth } from '@foadonis/openapi/decorators'

@inject()
export default class AuthController {
  constructor(protected userService: UserService) {
    //...
  }

  @ApiOperation({ summary: 'Register a new User' })
  @ApiBody({ type: () => createUserValidator })
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 409, type: 'object' })
  @ApiResponse({ status: 400, type: 'object' })
  async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)

    // Check if user already exists
    const user = await this.userService.getOnyBy('email', payload.email)

    if (user) {
      return response.conflict({ error: 'Email already exists' })
    }

    // Check for matching password inputs
    if (payload.password !== payload.passwordConfirmation) {
      return response.status(400).send({ error: 'Passwords do not match' })
    }

    // Create and return user
    return await this.userService.save(payload)
  }

  @ApiOperation({ summary: 'Login a User' })
  @ApiBody({ type: () => loginUserValidator })
  @ApiResponse({ status: 200, type: 'object' })
  async login({ request, response, auth }: HttpContext) {
    const data = request.only(['email', 'password'])
    const payload = await loginUserValidator.validate(data)

    const { email, password } = payload

    const user = await this.userService.getUserIfAvailable(email, password)

    if (!user) {
      return response.abort({ error: 'User does not exist' })
    }

    const token = await auth.use('api').createToken(user)

    return token
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout a User' })
  async logout({ auth }: HttpContext) {
    await auth.use('api').invalidateToken()
  }
}
