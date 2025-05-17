/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import openapi from '@foadonis/openapi/services/main'
import { middleware } from '#start/kernel'
import BasicAuthMiddleware from '#middleware/basic_auth_middleware'
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const RecipesController = () => import('#controllers/recipes_controller')
const IngredientsController = () => import('#controllers/ingredients_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const UnitsController = () => import('#controllers/units_controller')
const CollectionsController = () => import('#controllers/collections_controller')
const ImagesController = () => import('#controllers/images_controller')

// OpenAPI
openapi.registerRoutes()

router.get('/docs', () => openapi.generateUi('/api')).middleware(new BasicAuthMiddleware().handle)

// Default Route
router.get('/', ({ response }) => {
  return response.status(200).send({ server: 'running' })
})

// Main routes
router
  .group(() => {
    // Recipe routes
    router
      .resource('recipes', RecipesController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth())

    router.post('/find', [RecipesController, 'find']).prefix('recipes')

    router
      .post('/image/upload', [ImagesController, 'update'])
      .prefix('recipes')
      .as('recipe.image.upload')
      .use([middleware.auth()])
    router
      .post('/:id/image/delete', [ImagesController, 'delete'])
      .prefix('recipes')
      .as('recipe.image.delete')
      .use([middleware.auth()])

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

    router
      .post('/image/upload', [ImagesController, 'update'])
      .prefix('categories')
      .as('category.image.upload')
      .use([middleware.auth()])
    router
      .post('/:id/image/delete', [ImagesController, 'delete'])
      .prefix('categories')
      .as('category.image.delete')
      .use([middleware.auth()])

    // Unit routes
    router
      .resource('units', UnitsController)
      .apiOnly()
      .use(['store', 'show', 'update', 'destroy'], [middleware.auth(), middleware.admin()])

    // Collection routes
    router
      .resource('collections', CollectionsController)
      .apiOnly()
      .use(['index', 'store', 'show', 'update', 'destroy'], [middleware.auth()])

    router
      .get('/owned', [CollectionsController, 'owned'])
      .prefix('collections')
      .use([middleware.auth()])

    router
      .get('/:id/add/:recipeId', [CollectionsController, 'addRecipe'])
      .prefix('collections')
      .use([middleware.auth()])
    router
      .get('/:id/remove/:recipeId', [CollectionsController, 'removeRecipe'])
      .prefix('collections')
      .use([middleware.auth()])

    // User routes
    router
      .group(() => {
        router.get('/', [UsersController, 'index']).use([middleware.admin()])
        router.post('/', [UsersController, 'store']).use([middleware.admin()])
        router.get('/:id', [UsersController, 'show'])
        router.patch('/:id', [UsersController, 'update'])
        router.delete('/:id', [UsersController, 'destroy'])
        router.post('/:id/update-password', [UsersController, 'updatePassword'])
      })
      .use([middleware.auth()])
      .prefix('/users')

    // Auth routes
    router
      .group(() => {
        router.post('/register', [AuthController, 'register'])
        router.post('/login', [AuthController, 'login'])
        router.post('/logout', [AuthController, 'logout']).use(
          middleware.auth({
            guards: ['api'],
          })
        )
      })
      .prefix('/auth')
  })
  .prefix('/api/json/v1')
