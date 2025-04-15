import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Recipe from '#models/recipe'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => Recipe, {
    pivotTable: 'ingredient_recipe',
    pivotColumns: ['amount', 'unit'],
    pivotTimestamps: true,
  })
  declare recipe: ManyToMany<typeof Recipe>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  serializeExtras() {
    return {
      amount: this.$extras.pivot_amount,
      unit: this.$extras.pivot_unit,
    }
  }
}
