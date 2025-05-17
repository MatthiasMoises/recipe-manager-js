import vine from '@vinejs/vine'

export const createIngredientValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
  })
)

export const updateIngredientValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
  })
)
