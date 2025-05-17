import Recipe from '#models/recipe'
import { RecipeService } from '#services/recipe_service'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { inject } from '@adonisjs/core'
import { NewRecipeInput, PaginatedRecipes, UpdateRecipeInput } from '#graphql/types/recipe_types'
import { CurrentUser, Authorized } from '@foadonis/graphql'
import User from '#models/user'

@inject()
@Resolver(Recipe)
export default class RecipeResolver {
  constructor(protected recipeService: RecipeService) {
    //...
  }

  @Query(() => [Recipe])
  async recipes() {
    return await this.recipeService.getAll()
  }

  @Query(() => PaginatedRecipes)
  async paginatedRecipes(@Arg('page') page: number) {
    return await this.recipeService.getAll(page)
  }

  @Query(() => Recipe)
  async recipe(@Arg('id') id: number) {
    return await this.recipeService.getOneById(id)
  }

  @Query(() => Recipe)
  async recipeByName(@Arg('name') name: string) {
    return await this.recipeService.getOnyByName(name)
  }

  @Mutation(() => Recipe)
  @Authorized()
  async addRecipe(@Arg('newRecipeData') newRecipeData: NewRecipeInput, @CurrentUser() user: User) {
    return await this.recipeService.save(newRecipeData, user.id)
  }

  @Mutation(() => Recipe)
  @Authorized()
  async updateRecipe(
    @Arg('updateRecipeData') updateRecipeData: UpdateRecipeInput,
    @Arg('id') id: number
  ) {
    return await this.recipeService.update(updateRecipeData, id)
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteRecipe(@Arg('id') id: number) {
    return await this.recipeService.delete(id)
  }
}
