import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, computed, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Recipe from '#models/recipe'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { UserRole } from '#customtypes/user_role'
import { ObjectType, Field, ID } from '@foadonis/graphql'
import { ApiProperty } from '@foadonis/openapi/decorators'
import Collection from './collection.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

@ObjectType()
export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  @Field(() => ID)
  @ApiProperty({ type: Number })
  declare id: number

  @column()
  @Field(() => String, { nullable: true })
  @ApiProperty({ type: String, required: false })
  declare fullName?: string

  @column()
  @Field()
  @ApiProperty({ type: String, required: true })
  declare username: string

  @column()
  @Field()
  @ApiProperty({ type: String, required: true })
  declare email: string

  @column({ serializeAs: null })
  @Field()
  @ApiProperty({ type: String, required: true })
  declare password: string

  @column()
  @Field(() => String)
  @ApiProperty({ enum: UserRole, required: true, example: 'user' })
  declare role: UserRole

  @hasMany(() => Recipe)
  @Field(() => [Recipe])
  declare recipes: HasMany<typeof Recipe>

  @hasMany(() => Collection)
  @Field(() => [Collection])
  declare collections: HasMany<typeof Collection>

  @column.dateTime({ autoCreate: true })
  @Field(() => DateTime)
  @ApiProperty()
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  @Field(() => DateTime)
  @ApiProperty()
  declare updatedAt: DateTime

  @computed()
  get isAdmin() {
    return this.role === UserRole.ADMIN
  }

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}
