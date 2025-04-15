import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)

    // Check if user already exists
    const user = await User.findBy('email', payload.email)

    if (user) {
      return response.conflict({ error: 'Email already exists' })
    }

    // Check for matching password inputs
    if (payload.password !== payload.passwordConfirmation) {
      return response.status(400).send({ error: 'Passwords do not match' })
    }

    // Create user
    const newUser = new User()
    await newUser.fill(payload).save()

    return user
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    if (!user) {
      return response.abort({ error: 'User does not exist' })
    }

    return await auth.use('api').createToken(user)
  }

  async logout({ auth }: HttpContext) {
    await auth.use('api').invalidateToken()
  }
}
