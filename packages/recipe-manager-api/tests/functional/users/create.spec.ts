import { test } from '@japa/runner'

import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { UserRole } from '#customtypes/user_role'

test.group('creating user', () => {
  test('hashes user password', async ({ assert }) => {
    const user = new User()
    user.fullName = 'Testuser'
    user.username = 'test'
    user.email = 'test@test.com'
    user.password = 'secret'
    user.role = UserRole.USER

    await user.save()

    assert.isTrue(hash.isValidHash(user.password))
    assert.isTrue(await hash.verify(user.password, 'secret'))
  })
})
