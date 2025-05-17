import vine from '@vinejs/vine'
import { UserRole } from '#customtypes/user_role'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().optional(),
    username: vine.string().trim().minLength(3),
    email: vine.string().trim().email(),
    password: vine.string().trim(),
    passwordConfirmation: vine.string().trim(),
    role: vine.enum(UserRole),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().optional(),
    username: vine.string().trim().minLength(3),
    email: vine.string().trim().email(),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim(),
  })
)

export const updateUserPasswordValidator = vine.compile(
  vine.object({
    password: vine.string().trim(),
  })
)
