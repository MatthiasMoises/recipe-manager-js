import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Recipe from '#models/recipe'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    await Recipe.create({
      name: 'Milchreis',
      shortDescription: 'Rezept für lecker Milchreis',
      numberOfPeople: 2,
    })
  }
}
