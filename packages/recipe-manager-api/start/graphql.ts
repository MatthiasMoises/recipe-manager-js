import graphql from '@foadonis/graphql/services/main'

graphql.resolvers([
  () => import('#graphql/resolvers/user_resolver'),
  () => import('#graphql/resolvers/auth_resolver'),
  () => import('#graphql/resolvers/category_resolver'),
  () => import('#graphql/resolvers/ingredient_resolver'),
  () => import('#graphql/resolvers/unit_resolver'),
  () => import('#graphql/resolvers/recipe_resolver'),
])
