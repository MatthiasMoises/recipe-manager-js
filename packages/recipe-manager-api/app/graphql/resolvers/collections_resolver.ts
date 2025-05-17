import Collection from '#models/collection'
import { CollectionService } from '#services/collection_service'
import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { Authorized, CurrentUser } from '@foadonis/graphql'
import { inject } from '@adonisjs/core'
import {
  AddRemoveRecipeArgs,
  NewCollectionInput,
  UpdateCollectionInput,
} from '#graphql/types/collection_types'
import { userIsAdmin } from '#abilities/main'
import User from '#models/user'

@inject()
@Resolver(Collection)
export default class CollectionResolver {
  constructor(protected collectionService: CollectionService) {
    //...
  }

  @Query(() => [Collection])
  async collections() {
    return await this.collectionService.getAll()
  }

  @Query(() => Collection)
  @Authorized(userIsAdmin)
  async collection(@Arg('id') id: number) {
    return await this.collectionService.getOneById(id)
  }

  @Mutation(() => Collection)
  @Authorized(userIsAdmin)
  async addCollection(
    @Arg('newCollectionData') newCollectionData: NewCollectionInput,
    @CurrentUser() user: User
  ) {
    return await this.collectionService.save(newCollectionData, user.id)
  }

  @Mutation(() => Collection)
  @Authorized(userIsAdmin)
  async updateCollection(
    @Arg('updateCollectionData') updateCollectionData: UpdateCollectionInput,
    @Arg('id') id: number
  ) {
    return await this.collectionService.update(updateCollectionData, id)
  }

  @Mutation(() => Boolean)
  @Authorized(userIsAdmin)
  async deleteCollection(@Arg('id') id: number) {
    return await this.collectionService.delete(id)
  }

  @Query(() => Collection)
  @Authorized(userIsAdmin)
  async addRecipe(@Args() { collectionId, recipeId }: AddRemoveRecipeArgs) {
    return await this.collectionService.addRecipe(collectionId, recipeId)
  }

  @Query(() => Collection)
  @Authorized(userIsAdmin)
  async removeRecipe(@Args() { collectionId, recipeId }: AddRemoveRecipeArgs) {
    return await this.collectionService.removeRecipe(collectionId, recipeId)
  }
}
