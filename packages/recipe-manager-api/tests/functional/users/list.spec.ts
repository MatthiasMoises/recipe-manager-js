import { test } from '@japa/runner'

test.group('Users list', () => {
  test('get a list of users', async ({ client }) => {
    const response = await client.get('/api/json/v1/users')

    response.assertStatus(200)
    response.assertBodyContains([
      {
        id: 5,
        fullName: 'Testuser',
        username: 'test',
        email: 'test@test.com',
        role: 'user',
        createdAt: '2025-04-23T17:26:07.759+00:00',
        updatedAt: '2025-04-23T17:26:07.759+00:00',
      },
    ])
  })
})
