export type Recipe = {
  id: number
  name: string
  shortDescription: string
  instructions: string
  numberOfPeople: number
  imageUrl: string
  cookingTimeInMinutes: number
  restingTimeInMinutes: number
  difficulty: string
  calories: number
  categories: Array<number>,
  ingredients: Array
}