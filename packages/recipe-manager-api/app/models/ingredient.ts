import { DateTime } from 'luxon'
import { BaseModel, column, computed, manyToMany } from '@adonisjs/lucid/orm'
import Recipe from '#models/recipe'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { ObjectType, Field, ID, Int } from '@foadonis/graphql'
import { ApiProperty } from '@foadonis/openapi/decorators'

@ObjectType()
export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  @Field(() => ID)
  @ApiProperty({ type: Number, example: 10 })
  declare id: number

  @column()
  @Field(() => String)
  @ApiProperty({ type: String, required: true, example: 'Sugar' })
  declare name: string

  @manyToMany(() => Recipe, {
    pivotTable: 'ingredient_recipe',
    pivotColumns: ['amount', 'unit'],
    pivotTimestamps: true,
  })
  @Field(() => [Recipe], { nullable: true })
  declare recipe: ManyToMany<typeof Recipe>

  @column.dateTime({ autoCreate: true })
  @Field(() => DateTime)
  @ApiProperty()
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  @Field(() => DateTime)
  @ApiProperty()
  declare updatedAt: DateTime

  @computed()
  @Field(() => Int)
  get amount() {
    return this.$extras.pivot_amount
  }

  @computed()
  @Field(() => String)
  get unit() {
    return this.$extras.pivot_unit
  }

  serializeExtras() {
    return {
      amount: this.$extras.pivot_amount,
      unit: this.$extras.pivot_unit,
    }
  }
}
