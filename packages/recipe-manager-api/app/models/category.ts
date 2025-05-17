import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Recipe from '#models/recipe'
import { ObjectType, Field, ID } from '@foadonis/graphql'
import { ApiProperty } from '@foadonis/openapi/decorators'

@ObjectType()
export default class Category extends BaseModel {
  @column({ isPrimary: true })
  @Field(() => ID)
  @ApiProperty({ type: Number, example: 10 })
  declare id: number

  @column()
  @Field(() => String)
  @ApiProperty({ type: String, required: true })
  declare name: string

  @column()
  @Field(() => String)
  @ApiProperty({ type: String, required: true })
  declare description: string

  @column()
  @Field(() => String, { nullable: true })
  @ApiProperty({ type: String, required: false })
  declare thumbnail?: string

  @manyToMany(() => Recipe, {
    pivotTable: 'category_recipe',
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
