import type { HttpContext } from '@adonisjs/core/http'
import { createUnitValidator, updateUnitValidator } from '#validators/unit'
import { UnitService } from '#services/unit_service'
import { inject } from '@adonisjs/core'
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@foadonis/openapi/decorators'
import Unit from '#models/unit'
import { ApiBearerAuth } from '@foadonis/openapi/decorators'

@inject()
export default class UnitsController {
  constructor(protected unitService: UnitService) {
    //...
  }

  /**
   * Display a list of resource
   */
  @ApiOperation({ summary: 'List all Units' })
  @ApiResponse({ status: 200, type: [Unit] })
  async index({ response }: HttpContext) {
    const units = await this.unitService.getAll()
    return response.status(200).send(units)
  }

  /**
   * Show individual record
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List a single Unit' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({ status: 200, type: Unit })
  async show({ params, response }: HttpContext) {
    const unit = await this.unitService.getOneById(params.id)
    return response.status(200).send(unit)
  }

  /**
   * Handle form submission for the create action
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new Unit' })
  @ApiBody({ type: () => createUnitValidator })
  @ApiResponse({ status: 201, type: Unit })
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createUnitValidator.validate(data)

    const unit = await this.unitService.save(payload)
    return response.status(201).send(unit)
  }

  /**
   * Handle form submission for the edit action
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a Unit' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiBody({ type: () => updateUnitValidator })
  @ApiResponse({ status: 200, type: Unit })
  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await updateUnitValidator.validate(data)

    const unit = await this.unitService.update(payload, params.id)

    return response.status(200).send(unit)
  }

  /**
   * Delete record
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a Unit' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({ status: 204, type: 'object' })
  async destroy({ params, response }: HttpContext) {
    await this.unitService.delete(params.id)
    return response.status(204).send({})
  }
}
