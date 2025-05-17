import vine from '@vinejs/vine'

export const createRecipeValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(5),
    shortDescription: vine.string().trim().optional(),
    instructions: vine.string().trim().escape(),
    numberOfPeople: vine.number(),
    imageUrl: vine.string().trim().optional(),
    cookingTimeInMinutes: vine.number(),
    restingTimeInMinutes: vine.number().optional(),
    difficulty: vine.string().trim(),
    calories: vine.number().optional(),
    userId: vine.number().optional(),
    categories: vine.array(vine.number()).notEmpty(),
    ingredients: vine
      .array(
        vine.object({
          id: vine.number(),
          name: vine.string().trim(),
          unit: vine.string().trim(),
          amount: vine.number(),
        })
      )
      .notEmpty(),
  })
)

export const updateRecipeValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(5),
    shortDescription: vine.string().trim().optional(),
    instructions: vine.string().trim().escape(),
    numberOfPeople: vine.number(),
    imageUrl: vine.string().trim().optional(),
    cookingTimeInMinutes: vine.number(),
    restingTimeInMinutes: vine.number().optional(),
    difficulty: vine.string().trim(),
    calories: vine.number().optional(),
    userId: vine.number().optional(),
    categories: vine.array(vine.number()).optional(),
    ingredients: vine
      .array(
        vine.object({
          id: vine.number(),
          name: vine.string().trim(),
          unit: vine.string().trim(),
          amount: vine.number(),
        })
      )
      .optional(),
  })
)

export const findRecipeByNameValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
  })
)

export const updateRecipeImageValidator = vine.compile(
  vine.object({
    image: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
  })
)
