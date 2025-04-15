import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import {
  createUserValidator,
  updateUserValidator,
  updateUserPasswordValidator,
} from '#validators/user'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index() {
    const users = await User.all()
    return users
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)

    const user = new User()

    await user.fill(payload).save()

    return user
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const user = await User.find(params.id)
    return user
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.all()
    const user = await User.findOrFail(params.id)

    const payload = await updateUserValidator.validate(data)

    await user.merge(payload).save()

    return user
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.status(200).send({})
  }

  /**
   * Handle update user password
   */
  async updatePassword({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['password'])

    const payload = await updateUserPasswordValidator.validate(data)

    await user.merge({ password: payload.password }).save()

    return response.status(200).send(user)
  }
}
