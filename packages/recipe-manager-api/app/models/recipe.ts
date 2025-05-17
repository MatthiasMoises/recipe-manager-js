import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Ingredient from '#models/ingredient'
import Category from '#models/category'
import User from '#models/user'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { ObjectType, Field, ID, Int } from '@foadonis/graphql'
import { ApiProperty } from '@foadonis/openapi/decorators'
import { RecipeIngredientOpenApiDTO } from '#customtypes/recipe_ingredient_dtos'
import Collection from '#models/collection'

@ObjectType()
export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  @Field(() => ID)
  @ApiProperty({ type: Number, example: 10 })
  declare id: number

  @column()
  @Field(() => String)
  @ApiProperty({ type: String, required: true, example: 'Pizza' })
  declare name: string

  @column()
  @Field(() => String, { nullable: true })
  @ApiProperty({ type: String, required: false })
  declare shortDescription?: string

  @column()
  @Field(() => String)
  @ApiProperty({ type: String, required: true })
  declare instructions: string

  @column()
  @Field(() => Int)
  @ApiProperty({ type: Number, required: true, example: 2 })
  declare numberOfPeople: number

  @column()
  @Field(() => String, { nullable: true })
  @ApiProperty({ type: String, required: false })
  declare imageUrl?: string

  @column()
  @Field(() => Int)
  @ApiProperty({ type: Number, required: true, example: 15 })
  declare cookingTimeInMinutes: number

  @column()
  @Field(() => Int, { nullable: true })
  @ApiProperty({ type: Number, required: false, example: 20 })
  declare restingTimeInMinutes?: number

  @column()
  @Field(() => String)
  @ApiProperty({ type: String, required: true, example: 'easy' })
  declare difficulty: string

  @column()
  @Field(() => Int, { nullable: true })
  @ApiProperty({ type: Number, required: false, example: 1000 })
  declare calories?: number

  @column()
  @Field(() => Int)
  @ApiProperty({ type: Number, required: true, example: 5 })
  declare userId: number

  @belongsTo(() => User)
  @Field(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Ingredient, {
    pivotTable: 'ingredient_recipe',
    pivotColumns: ['amount', 'unit'],
    pivotTimestamps: true,
  })
  @Field(() => [Ingredient])
  @ApiProperty({ type: [RecipeIngredientOpenApiDTO], required: true })
  declare ingredients: ManyToMany<typeof Ingredient>

  @manyToMany(() => Category, {
    pivotTable: 'category_recipe',
    pivotTimestamps: true,
  })
  @Field(() => [Category])
  @ApiProperty({
    schema: { type: 'array', items: { type: 'integer' } },
    required: true,
  })
  declare categories: ManyToMany<typeof Category>

  @manyToMany(() => Collection, {
    pivotTable: 'collection_recipe',
    pivotTimestamps: true,
  })
  @Field(() => [Collection], { nullable: true })
  declare collections: ManyToMany<typeof Collection>

  @column.dateTime({ autoCreate: true })
  @Field(() => DateTime)
  @ApiProperty()
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  @Field(() => DateTime)
  @ApiProperty()
  declare updatedAt: DateTime
}
