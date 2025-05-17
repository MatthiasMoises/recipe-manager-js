import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Recipe from '#models/recipe'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    const recipe = await Recipe.create({
      name: 'Pizza',
      shortDescription: 'Rezept für lecker Pizza',
      instructions:
        'Teig machen und gehen lassen. Teig kneten, ausrollen und dann belegen. Bei 200 Grad für 20 Minuten in den Ofen.',
      numberOfPeople: 2,
      imageUrl: '',
      cookingTimeInMinutes: 20,
      restingTimeInMinutes: 30,
      difficulty: 'easy',
      calories: 500,
      userId: 2,
    })

    await recipe.related('categories').attach([1, 2])

    await recipe.related('ingredients').attach({
      [9]: {
        unit: 'kg',
        amount: 1,
      },
      [10]: {
        unit: 'EL',
        amount: 1,
      },
    })
  }
}
