import { ArgsType, Field, InputType, Int } from 'type-graphql'
import { Length, MaxLength } from 'class-validator'
import { UserRole } from '#customtypes/user_role'

@InputType()
export class NewUserInput {
  @Field(() => String, { nullable: true })
  @MaxLength(30)
  declare fullname: string | null

  @Field(() => String)
  @Length(5, 30)
  declare username: string

  @Field(() => String)
  @Length(30, 255)
  declare email: string

  @Field(() => String)
  declare password: string

  @Field(() => String)
  declare passwordConfirmation: string

  @Field(() => String)
  declare role: UserRole
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @MaxLength(30)
  declare fullname?: string

  @Field(() => String, { nullable: true })
  @Length(5, 30)
  declare username?: string

  @Field(() => String, { nullable: true })
  @Length(30, 255)
  declare email?: string

  @Field(() => String, { nullable: true })
  declare role?: UserRole
}

@ArgsType()
export class UpdatePasswordArgs {
  @Field(() => String)
  password!: string

  @Field(() => Int)
  id!: number
}
