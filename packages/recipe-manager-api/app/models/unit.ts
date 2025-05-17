import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { ObjectType, Field, ID } from '@foadonis/graphql'
import { ApiProperty } from '@foadonis/openapi/decorators'

@ObjectType()
export default class Unit extends BaseModel {
  @column({ isPrimary: true })
  @Field(() => ID)
  @ApiProperty({ type: Number, example: 10 })
  declare id: number

  @column()
  @Field(() => String)
  @ApiProperty({ type: String, required: true, example: 'TL' })
  declare name: string

  @column.dateTime({ autoCreate: true })
  @Field(() => DateTime)
  @ApiProperty()
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  @Field(() => DateTime)
  @ApiProperty()
  declare updatedAt: DateTime
}
