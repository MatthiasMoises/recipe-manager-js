import vine from '@vinejs/vine'

export const createIngredientValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
    cupInGrams: vine.number(),
    levelTablespoonInGrams: vine.number(),
    heapedTablespoonInGrams: vine.number(),
    levelTeaspoonInGrams: vine.number(),
  })
)

export const updateIngredientValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
    cupInGrams: vine.number(),
    levelTablespoonInGrams: vine.number(),
    heapedTablespoonInGrams: vine.number(),
    levelTeaspoonInGrams: vine.number(),
  })
)
