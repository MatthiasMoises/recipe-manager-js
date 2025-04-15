import vine from '@vinejs/vine'

export const createUnitValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
  })
)

export const updateUnitValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
  })
)
