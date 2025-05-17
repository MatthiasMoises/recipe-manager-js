import User from '#models/user'
import { Arg, Args, Mutation, Resolver } from 'type-graphql'
import { HttpContext } from '@adonisjs/core/http'
import { Ctx, Authorized } from '@foadonis/graphql'
import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import { NewUserInput } from '#graphql/types/user_types'
import { UserLoginArgs, UserToken } from '#graphql/types/auth_types'

@inject()
@Resolver(User)
export default class AuthResolver {
  constructor(protected userService: UserService) {
    //...
  }

  @Mutation(() => User)
  async register(@Arg('newUserData') newUserData: NewUserInput) {
    const user = await this.userService.getOnyBy('email', newUserData.email)

    if (!user) {
      return await this.userService.save(newUserData)
    }
    return null
  }

  @Mutation(() => UserToken)
  async login(@Args() { email, password }: UserLoginArgs) {
    const user = await this.userService.getUserIfAvailable(email, password)

    let token = null

    if (user) {
      token = await User.accessTokens.create(user)

      return {
        type: 'bearer',
        name: token.name,
        value: token.value!.release(),
        abilities: token.abilities,
        lastUsedAt: token.lastUsedAt,
        expiresAt: token.expiresAt,
      }
    }

    return null
  }

  @Mutation(() => Boolean)
  @Authorized()
  async logout(@Ctx() ctx: HttpContext) {
    await ctx.auth.use('api').invalidateToken()
  }
}
