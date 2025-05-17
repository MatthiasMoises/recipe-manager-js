import { Field, InputType } from 'type-graphql'
import { MaxLength } from 'class-validator'

@InputType()
export class NewIngredientInput {
  @Field(() => String)
  @MaxLength(30)
  declare name: string
}

@InputType()
export class UpdateIngredientInput {
  @Field(() => String)
  @MaxLength(30)
  declare name: string
}
