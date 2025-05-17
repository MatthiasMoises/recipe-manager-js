import vine from '@vinejs/vine'

export const createCollectionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    userId: vine.number().optional(),
  })
)

export const updateCollectionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    userId: vine.number().optional(),
  })
)
