'use server'

import axios from '@/lib/axios'
import { User } from '@/types/user'

export const registerUser = async (user: User) => {
  const response = await axios.post<Promise<User>>('/auth/register', user)

  if (response.status !== 200) {
    return { message: 'Error creating an account, please try again later.' }
  }

  return response.data
}

export const loginUser = async () => { }
export const logoutUser = async () => { }