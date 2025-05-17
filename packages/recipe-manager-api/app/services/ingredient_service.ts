import Ingredient from '#models/ingredient'

export class IngredientService {
  async getAll(): Promise<Ingredient[]> {
    const ingredients = await Ingredient.all()
    return ingredients
  }

  async getOneById(id: number): Promise<Ingredient> {
    const ingredient = await Ingredient.findOrFail(id)
    return ingredient
  }

  async getOnyBy(key: string, value: string | number): Promise<Ingredient | null> {
    const ingredient = await Ingredient.findByOrFail(key, value)
    return ingredient
  }

  async save(ingredientData: Partial<Ingredient>): Promise<Ingredient> {
    const ingredient = new Ingredient()
    await ingredient.fill(ingredientData).save()
    return ingredient
  }

  async update(ingredientData: Partial<Ingredient>, id: number): Promise<Ingredient> {
    const ingredient = await Ingredient.findOrFail(id)
    await ingredient.merge(ingredientData).save()
    return ingredient
  }

  async delete(id: number): Promise<void> {
    const ingredient = await Ingredient.findOrFail(id)
    await ingredient.related('recipe').detach()
    await ingredient.delete()
  }
}
