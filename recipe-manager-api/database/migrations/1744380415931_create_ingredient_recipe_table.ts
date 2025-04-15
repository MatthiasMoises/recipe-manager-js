import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ingredient_recipe'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('ingredient_id').unsigned().references('ingredients.id')
      table.integer('recipe_id').unsigned().references('recipes.id')
      table.unique(['ingredient_id', 'recipe_id'])
      table.integer('amount').defaultTo(0)
      table.string('unit').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
