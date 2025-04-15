import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Ingredient from '#models/ingredient'
import Category from '#models/category'
import User from '#models/user'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare shortDescription: string | null

  @column()
  declare instructions: string

  @column()
  declare numberOfPeople: number

  @column()
  declare imageUrl: string | null

  @column()
  declare cookingTimeInMinutes: number

  @column()
  declare restingTimeInMinutes: number | null

  @column()
  declare difficulty: string

  @column()
  declare calories: number | null

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Ingredient, {
    pivotTable: 'ingredient_recipe',
    pivotColumns: ['amount', 'unit'],
    pivotTimestamps: true,
  })
  declare ingredients: ManyToMany<typeof Ingredient>

  @manyToMany(() => Category, {
    pivotTable: 'category_recipe',
    pivotTimestamps: true,
  })
  declare categories: ManyToMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
