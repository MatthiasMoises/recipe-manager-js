import User from '#models/user'
import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { Authorized } from '@foadonis/graphql'
import { NewUserInput, UpdatePasswordArgs, UpdateUserInput } from '#graphql/types/user_types'
import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import { userIsAdmin } from '#abilities/main'

@inject()
@Resolver(User)
export default class UserResolver {
  constructor(protected userService: UserService) {
    //...
  }

  @Query(() => [User])
  @Authorized(userIsAdmin)
  async users() {
    return await this.userService.getAll()
  }

  @Query(() => User)
  @Authorized()
  async user(@Arg('id') id: number) {
    return await this.userService.getOneById(id)
  }

  @Mutation(() => User)
  @Authorized()
  async addUser(@Arg('newUserData') newUserData: NewUserInput) {
    return await this.userService.save(newUserData)
  }

  @Mutation(() => User)
  @Authorized()
  async updateUser(@Arg('updateUserData') updateUserData: UpdateUserInput, @Arg('id') id: number) {
    return await this.userService.update(updateUserData, id)
  }

  @Mutation(() => Boolean)
  @Authorized()
  async removeUser(@Arg('id') id: number) {
    return await this.userService.delete(id)
  }

  @Mutation(() => User)
  @Authorized()
  async updatePassword(@Args() { password, id }: UpdatePasswordArgs) {
    return await this.userService.updatePassword(password, id)
  }
}
