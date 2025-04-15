/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const RecipesController = () => import('#controllers/recipes_controller')
const IngredientsController = () => import('#controllers/ingredients_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const UnitsController = () => import('#controllers/units_controller')

router.get('/', ({ response }) => {
  return response.status(200).send({ server: 'running' })
})

router
  .group(() => {
    // Recipe routes
    router
      .resource('recipes', RecipesController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth())

    // Ingredient routes
    router
      .resource('ingredients', IngredientsController)
      .apiOnly()
      .use(['store', 'show', 'update', 'destroy'], [middleware.auth(), middleware.admin()])

    // Category routes
    router
      .resource('categories', CategoriesController)
      .apiOnly()
      .use(['store', 'show', 'update', 'destroy'], [middleware.auth(), middleware.admin()])

    // Unit routes
    router
      .resource('units', UnitsController)
      .apiOnly()
      .use(['store', 'show', 'update', 'destroy'], [middleware.auth(), middleware.admin()])

    // User routes
    router
      .group(() => {
        router.get('/', '#controllers/users_controller.index').use([middleware.admin()])
        router.post('/', '#controllers/users_controller.store')
        router.get('/:id', '#controllers/users_controller.show')
        router.patch('/:id', '#controllers/users_controller.update')
        router.delete('/:id', '#controllers/users_controller.destroy')
        router.post('/:id/update-password', '#controllers/users_controller.updatePassword')
      })
      .prefix('/users')

    // Auth routes
    router
      .group(() => {
        router.post('/register', '#controllers/auth_controller.register')
        router.post('/login', '#controllers/auth_controller.login')
        router.post('/logout', '#controllers/auth_controller.logout').use(
          middleware.auth({
            guards: ['api'],
          })
        )
      })
      .prefix('/auth')
  })
  .prefix('/api/json/v1')
