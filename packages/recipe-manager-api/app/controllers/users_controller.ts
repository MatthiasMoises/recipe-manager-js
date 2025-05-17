import type { HttpContext } from '@adonisjs/core/http'
import {
  createUserValidator,
  updateUserValidator,
  updateUserPasswordValidator,
} from '#validators/user'
import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@foadonis/openapi/decorators'
import User from '#models/user'
import { ApiBearerAuth } from '@foadonis/openapi/decorators'

@ApiBearerAuth()
@inject()
export default class UsersController {
  constructor(protected userService: UserService) {
    // ...
  }

  /**
   * Display a list of resource
   */
  @ApiOperation({ summary: 'List all Users' })
  @ApiResponse({ status: 200, type: [User] })
  async index({ response }: HttpContext) {
    const users = await this.userService.getAll()
    return response.status(200).send(users)
  }

  /**
   * Show individual record
   */
  @ApiOperation({ summary: 'List a single User' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({ status: 200, type: User })
  async show({ params, response }: HttpContext) {
    const user = await this.userService.getOneById(params.id)
    return response.status(200).send(user)
  }

  /**
   * Handle form submission for the create action
   */
  @ApiOperation({ summary: 'Create a new User' })
  @ApiBody({ type: () => createUserValidator })
  @ApiResponse({ status: 201, type: User })
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)

    const user = this.userService.save(payload)

    return response.status(201).send(user)
  }

  /**
   * Handle form submission for the edit action
   */
  @ApiOperation({ summary: 'Update a User' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiBody({ type: () => updateUserValidator })
  @ApiResponse({ status: 200, type: User })
  async update({ params, request, response }: HttpContext) {
    const data = request.all()

    const payload = await updateUserValidator.validate(data)

    const user = await this.userService.update(payload, params.id)

    return response.status(200).send(user)
  }

  /**
   * Delete record
   */
  @ApiOperation({ summary: 'Delete a User' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({ status: 204, type: 'object' })
  async destroy({ params, response }: HttpContext) {
    await this.userService.delete(params.id)
    return response.status(204).send({})
  }

  /**
   * Handle update user password
   */
  @ApiOperation({ summary: 'Update a Users Password' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiBody({ type: () => updateUserPasswordValidator })
  @ApiResponse({ status: 200, type: User })
  async updatePassword({ params, request, response }: HttpContext) {
    const data = request.only(['password'])

    const payload = await updateUserPasswordValidator.validate(data)

    const user = await this.userService.updatePassword(payload.password, params.id)

    return response.status(200).send(user)
  }
}
