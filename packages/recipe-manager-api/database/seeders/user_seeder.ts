import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { UserRole } from '#customtypes/user_role'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    await User.createMany([
      {
        fullName: 'Administrator',
        username: 'admin',
        email: 'admin@root.com',
        password: 'admin',
        role: UserRole.ADMIN,
      },
      {
        fullName: 'Test User1',
        username: 'testuser',
        email: 'virk@adonisjs.com',
        password: 'secret',
        role: UserRole.USER,
      },
      {
        fullName: 'Test User2',
        username: 'testuser2',
        email: 'romain@adonisjs.com',
        password: 'supersecret',
        role: UserRole.USER,
      },
    ])
  }
}
