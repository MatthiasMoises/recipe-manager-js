import Category from '#models/category'
import { CategoryService } from '#services/category_service'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Authorized } from '@foadonis/graphql'
import { inject } from '@adonisjs/core'
import { NewCategoryInput, UpdateCategoryInput } from '#graphql/types/category_types'
import { userIsAdmin } from '#abilities/main'

@inject()
@Resolver(Category)
export default class CategoryResolver {
  constructor(protected categoryService: CategoryService) {
    //...
  }

  @Query(() => [Category])
  async categories() {
    return await this.categoryService.getAll()
  }

  @Query(() => Category)
  @Authorized(userIsAdmin)
  async category(@Arg('id') id: number) {
    return await this.categoryService.getOneById(id)
  }

  @Mutation(() => Category)
  @Authorized(userIsAdmin)
  async addCategory(@Arg('newCategoryData') newCategoryData: NewCategoryInput) {
    return await this.categoryService.save(newCategoryData)
  }

  @Mutation(() => Category)
  @Authorized(userIsAdmin)
  async updateCategory(
    @Arg('updateCategoryData') updateCategoryData: UpdateCategoryInput,
    @Arg('id') id: number
  ) {
    return await this.categoryService.update(updateCategoryData, id)
  }

  @Mutation(() => Boolean)
  @Authorized(userIsAdmin)
  async deleteCategory(@Arg('id') id: number) {
    return await this.categoryService.delete(id)
  }
}
