import { ArgsType, Field, ObjectType } from '@foadonis/graphql'
import { DateTime } from 'luxon'

@ArgsType()
export class UserLoginArgs {
  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string
}

@ObjectType()
export class UserToken {
  @Field(() => String)
  type!: string

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String)
  value!: string

  @Field(() => [String], { nullable: true })
  abilities?: Array<string>

  @Field(() => String, { nullable: true })
  expiresAt?: DateTime

  @Field(() => String, { nullable: true })
  lastUsedAt?: DateTime
}
