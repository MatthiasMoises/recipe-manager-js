import { Field, InputType } from 'type-graphql'
import { MaxLength } from 'class-validator'

@InputType()
export class NewUnitInput {
  @Field(() => String)
  @MaxLength(30)
  declare name: string
}

@InputType()
export class UpdateUnitInput {
  @Field(() => String)
  @MaxLength(30)
  declare name: string
}
