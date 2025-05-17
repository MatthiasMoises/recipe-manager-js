import Category from '#models/category'

export class CategoryService {
  async getAll(): Promise<Category[]> {
    const categories = await Category.all()
    return categories
  }

  async getOneById(id: number): Promise<Category> {
    const category = await Category.findOrFail(id)
    return category
  }

  async getOnyBy(key: string, value: string | number): Promise<Category | null> {
    const category = await Category.findByOrFail(key, value)
    return category
  }

  async save(categoryData: Partial<Category>): Promise<Category> {
    const category = new Category()
    await category.fill(categoryData).save()

    return category
  }

  async update(categoryData: Partial<Category>, id: number): Promise<Category> {
    const category = await Category.findOrFail(id)
    await category.merge(categoryData).save()

    return category
  }

  async delete(id: number): Promise<void> {
    const category = await Category.findOrFail(id)
    await category.related('recipes').detach()
    await category.delete()
  }
}
