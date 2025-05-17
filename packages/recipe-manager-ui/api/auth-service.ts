import axios from '@/api/client'
import type { User } from '@/types/user'

export default class AuthService {
  async register(user: User) {
    try {
      const response = await axios.post<Promise<User>>('/auth/register', user)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
  async login() { }
  async logout() { }
}