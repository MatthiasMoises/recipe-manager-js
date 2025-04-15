import type { HttpContext } from '@adonisjs/core/http'
import Unit from '#models/unit'
import { createUnitValidator, updateUnitValidator } from '#validators/unit'

export default class UnitsController {
  /**
   * Display a list of resource
   */
  async index() {
    const units = await Unit.all()
    return units
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.all()
    const payload = await createUnitValidator.validate(data)

    const unit = new Unit()
    await unit.fill(payload).save()

    return unit
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const unit = await Unit.find(params.id)
    return unit
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.all()
    const payload = await updateUnitValidator.validate(data)

    const unit = await Unit.findOrFail(params.id)
    await unit.merge(payload).save()

    return unit
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const unit = await Unit.findOrFail(params.id)
    await unit.delete()
    return response.status(200).send({})
  }
}
