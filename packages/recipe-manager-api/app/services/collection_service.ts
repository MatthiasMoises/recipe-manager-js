import Collection from '#models/collection'

export class CollectionService {
  async getAll(): Promise<Collection[]> {
    const collections = await Collection.all()
    return collections
  }

  async getOwnedByUser(userId: number) {
    const collections = await Collection.findBy('userId', userId)
    return collections
  }

  async getOneById(id: number): Promise<Collection> {
    const collection = await Collection.findOrFail(id)
    return collection
  }

  async getOnyBy(key: string, value: string | number): Promise<Collection | null> {
    const collection = await Collection.findByOrFail(key, value)
    return collection
  }

  async save(collectionData: Partial<Collection>, userId: number): Promise<Collection> {
    const collection = new Collection()
    if (!collectionData.userId) {
      collectionData.userId = userId
    }
    await collection.fill(collectionData).save()
    return collection
  }

  async update(
    collectionData: Partial<Collection>,
    id: number,
    loadedCollection?: Collection
  ): Promise<Collection> {
    let collection = null

    if (loadedCollection) {
      collection = loadedCollection
    } else {
      collection = await Collection.findOrFail(id)
    }

    await collection.merge(collectionData).save()
    return collection
  }

  async delete(id: number): Promise<void> {
    const collection = await Collection.findOrFail(id)
    await collection.delete()
  }

  async addRecipe(collectionId: number, recipeId: string | number) {
    const collection = await Collection.findOrFail(collectionId)
    await collection.related('recipes').attach([recipeId])
    return collection
  }

  async removeRecipe(collectionId: number, recipeId: string | number) {
    const collection = await Collection.findOrFail(collectionId)
    await collection.related('recipes').detach([recipeId])
    return collection
  }
}
