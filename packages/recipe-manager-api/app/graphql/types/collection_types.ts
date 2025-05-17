import { ArgsType, Field, InputType, Int } from 'type-graphql'
import { MaxLength } from 'class-validator'

@InputType()
export class NewCollectionInput {
  @Field(() => String)
  @MaxLength(30)
  declare name: string

  @Field(() => Int, { nullable: true })
  declare userId?: number
}

@InputType()
export class UpdateCollectionInput {
  @Field(() => String)
  @MaxLength(30)
  declare name: string

  @Field(() => Int, { nullable: true })
  declare userId?: number
}

@ArgsType()
export class AddRemoveRecipeArgs {
  @Field(() => Int, { nullable: false })
  collectionId!: number

  @Field(() => Int, { nullable: false })
  recipeId!: number
}
