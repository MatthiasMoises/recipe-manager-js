import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { ObjectType, Field, ID, Int } from '@foadonis/graphql'
import { ApiProperty } from '@foadonis/openapi/decorators'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Recipe from '#models/recipe'

@ObjectType()
export default class Collection extends BaseModel {
  @column({ isPrimary: true })
  @Field(() => ID)
  @ApiProperty({ type: Number, example: 10 })
  declare id: number

  @column()
  @Field(() => String)
  @ApiProperty({ type: String, required: true, example: 'Breakfast' })
  declare name: string

  @column()
  @Field(() => Int)
  @ApiProperty({ type: Number, required: true, example: 5 })
  declare userId: number

  @belongsTo(() => User)
  @Field(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Recipe, {
    pivotTable: 'collection_recipe',
    pivotTimestamps: true,
  })
  @Field(() => [Recipe], { nullable: true })
  declare recipes: ManyToMany<typeof Recipe>

  @column.dateTime({ autoCreate: true })
  @Field(() => DateTime)
  @ApiProperty()
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  @Field(() => DateTime)
  @ApiProperty()
  declare updatedAt: DateTime
}
