import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Ingredient from '#models/ingredient'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    await Ingredient.createMany([
      {
        name: 'Milch',
      },
      {
        name: 'Saft',
      },
      {
        name: 'Wasser',
      },
      {
        name: 'Sahne',
      },
      {
        name: 'Wein',
      },
      {
        name: 'Kakao',
      },
      {
        name: 'Nüsse',
      },
      {
        name: 'Öl',
      },
      {
        name: 'Mehl',
      },
      {
        name: 'Zucker',
      },
    ])
  }
}
