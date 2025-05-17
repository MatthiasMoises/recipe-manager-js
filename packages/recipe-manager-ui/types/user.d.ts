import { UserRole } from "./user-role"

export type User = {
  id: number
  fullName?: string
  username: string
  email: string
  password?: string
  role: UserRole
  createdAt: string
  updatedAt?: string
}