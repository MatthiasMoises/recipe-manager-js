import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recipes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('short_description').nullable()
      table.text('instructions').notNullable()
      table.integer('number_of_people').notNullable()
      table.string('image_url').nullable()
      table.integer('cooking_time_in_minutes').notNullable()
      table.integer('resting_time_in_minutes').nullable()
      table.string('difficulty').notNullable()
      table.integer('calories').nullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
