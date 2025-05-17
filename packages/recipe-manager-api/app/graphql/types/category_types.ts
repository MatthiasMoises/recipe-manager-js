import { Field, InputType } from 'type-graphql'
import { Length, MaxLength } from 'class-validator'

@InputType()
export class NewCategoryInput {
  @Field(() => String)
  @MaxLength(30)
  declare name: string

  @Field(() => String)
  @Length(5, 100)
  declare description: string

  @Field(() => String, { nullable: true })
  declare thumbnail?: string
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  @MaxLength(30)
  declare name?: string

  @Field(() => String, { nullable: true })
  @Length(5, 100)
  declare description?: string

  @Field(() => String, { nullable: true })
  declare thumbnail?: string
}
