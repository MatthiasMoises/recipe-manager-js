import { RecipeIngredientDTO } from '#customtypes/recipe_ingredient_dtos'
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import { MaxLength } from 'class-validator'
import Recipe from '#models/recipe'

@InputType()
export class NewRecipeInput {
  @Field(() => String)
  @MaxLength(30)
  declare name: string

  @Field(() => String, { nullable: true })
  @MaxLength(100)
  declare shortDescription?: string

  @Field(() => String)
  @MaxLength(255)
  declare instructions: string

  @Field(() => Int)
  declare numberOfPeople: number

  @Field(() => String, { nullable: true })
  declare imageUrl?: string

  @Field(() => Int)
  declare cookingTimeInMinutes: number

  @Field(() => Int, { nullable: true })
  declare restingTimeInMinutes?: number

  @Field(() => String)
  declare difficulty: string

  @Field(() => Int, { nullable: true })
  declare calories?: number

  @Field(() => Int, { nullable: true })
  declare userId?: number

  @Field(() => [RecipeIngredient])
  declare ingredients: Array<RecipeIngredientDTO>

  @Field(() => [Int])
  declare categories: Array<number>
}

@InputType()
export class UpdateRecipeInput {
  @Field(() => String, { nullable: true })
  @MaxLength(30)
  declare name?: string

  @Field(() => String, { nullable: true })
  @MaxLength(100)
  declare shortDescription?: string

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  declare instructions?: string

  @Field(() => Int, { nullable: true })
  declare numberOfPeople?: number

  @Field(() => String, { nullable: true })
  declare imageUrl?: string

  @Field(() => Int, { nullable: true })
  declare cookingTimeInMinutes?: number

  @Field(() => Int, { nullable: true })
  declare restingTimeInMinutes?: number

  @Field(() => String, { nullable: true })
  declare difficulty?: string

  @Field(() => Int, { nullable: true })
  declare calories?: number

  @Field(() => Int, { nullable: true })
  declare userId?: number

  @Field(() => [RecipeIngredient], { nullable: true })
  declare ingredients?: Array<RecipeIngredientDTO>

  @Field(() => [Int], { nullable: true })
  declare categories?: Array<number>
}

@InputType()
export class RecipeIngredient {
  @Field(() => ID)
  declare id: number

  @Field(() => String)
  declare name: string

  @Field(() => String)
  declare unit: string

  @Field(() => Int)
  declare amount: number
}

@ObjectType()
export class PaginationMeta {
  @Field(() => Int)
  declare total: number
  @Field(() => Int)
  declare perPage: number
  @Field(() => Int)
  declare currentPage: number
  @Field(() => Int)
  declare lastPage: number
  @Field(() => Int)
  declare firstPage: number
  @Field(() => String)
  declare firstPageUrl: string
  @Field(() => String, { nullable: true })
  declare lastPageUrl?: string | null
  @Field(() => String, { nullable: true })
  declare nextPageUrl?: string | null
  @Field(() => String, { nullable: true })
  declare previousPageUrl?: string | null
}

@ObjectType()
export class PaginatedRecipes {
  @Field(() => PaginationMeta)
  declare meta: object
  @Field(() => [Recipe])
  declare data: Array<Recipe>
}
