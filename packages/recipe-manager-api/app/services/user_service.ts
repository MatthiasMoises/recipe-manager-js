import User from '#models/user'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import { HttpContext } from '@adonisjs/core/http'

export class UserService {
  async getAll(): Promise<User[]> {
    const users = await User.all()
    return users
  }

  async getOneById(id: number): Promise<User> {
    const user = await User.findOrFail(id)
    return user
  }

  async getOnyBy(key: string, value: string | number): Promise<User | null> {
    const user = await User.findByOrFail(key, value)
    return user
  }

  async getUserIfAvailable(email: string, password: string): Promise<User | null> {
    return await User.verifyCredentials(email, password)
  }

  async save(userData: Partial<User>): Promise<User> {
    const user = new User()
    await user.fill(userData).save()
    return user
  }

  async update(userData: Partial<User>, id: number): Promise<User> {
    const user = await User.findOrFail(id)
    await user.merge(userData).save()
    return user
  }

  async delete(id: number): Promise<void> {
    const user = await User.findOrFail(id)
    await user.delete()
  }

  async updatePassword(newPassword: string, id: number): Promise<User> {
    const user = await User.findOrFail(id)
    await user.merge({ password: newPassword }).save()
    return user
  }

  async getAccessToken(user: User): Promise<AccessToken> {
    return await User.accessTokens.create(user)
  }

  async invalidateAccessToken({ auth }: HttpContext): Promise<void> {
    await auth.use('api').invalidateToken()
  }
}
