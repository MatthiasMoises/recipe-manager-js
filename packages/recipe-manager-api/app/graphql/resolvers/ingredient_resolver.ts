import Ingredient from '#models/ingredient'
import { IngredientService } from '#services/ingredient_service'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Authorized } from '@foadonis/graphql'
import { inject } from '@adonisjs/core'
import { NewIngredientInput, UpdateIngredientInput } from '#graphql/types/ingredient_types'
import { userIsAdmin } from '#abilities/main'

@inject()
@Resolver(Ingredient)
export default class IngredientResolver {
  constructor(protected ingredientService: IngredientService) {
    //...
  }

  @Query(() => [Ingredient])
  async ingredients() {
    return await this.ingredientService.getAll()
  }

  @Query(() => Ingredient)
  @Authorized(userIsAdmin)
  async ingredient(@Arg('id') id: number) {
    return await this.ingredientService.getOneById(id)
  }

  @Mutation(() => Ingredient)
  @Authorized(userIsAdmin)
  async addIngredient(@Arg('newIngredientData') newIngredientData: NewIngredientInput) {
    return await this.ingredientService.save(newIngredientData)
  }

  @Mutation(() => Ingredient)
  @Authorized(userIsAdmin)
  async updateIngredient(
    @Arg('updateIngredientData') updateIngredientData: UpdateIngredientInput,
    @Arg('id') id: number
  ) {
    return await this.ingredientService.update(updateIngredientData, id)
  }

  @Mutation(() => Boolean)
  @Authorized(userIsAdmin)
  async deleteIngredient(@Arg('id') id: number) {
    return await this.ingredientService.delete(id)
  }
}
