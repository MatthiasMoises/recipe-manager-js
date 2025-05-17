import Unit from '#models/unit'
import { UnitService } from '#services/unit_service'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Authorized } from '@foadonis/graphql'
import { inject } from '@adonisjs/core'
import { NewUnitInput, UpdateUnitInput } from '#graphql/types/unit_types'
import { userIsAdmin } from '#abilities/main'

@inject()
@Resolver(Unit)
export default class UnitResolver {
  constructor(protected unitService: UnitService) {
    //...
  }

  @Query(() => [Unit])
  async units() {
    return await this.unitService.getAll()
  }

  @Query(() => Unit)
  @Authorized(userIsAdmin)
  async unit(@Arg('id') id: number) {
    return await this.unitService.getOneById(id)
  }

  @Mutation(() => Unit)
  @Authorized(userIsAdmin)
  async addUnit(@Arg('newUnitData') newUnitData: NewUnitInput) {
    return await this.unitService.save(newUnitData)
  }

  @Mutation(() => Unit)
  @Authorized(userIsAdmin)
  async updateUnit(@Arg('updateUnitData') updateUnitData: UpdateUnitInput, @Arg('id') id: number) {
    return await this.unitService.update(updateUnitData, id)
  }

  @Mutation(() => Boolean)
  @Authorized(userIsAdmin)
  async deleteUnit(@Arg('id') id: number) {
    return await this.unitService.delete(id)
  }
}
