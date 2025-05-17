import { ApiProperty } from '@foadonis/openapi/decorators'

export type RecipeIngredientDTO = {
  id: number
  name: string
  unit: string
  amount: number
}

export class RecipeIngredientOpenApiDTO {
  @ApiProperty({ type: Number })
  id: any

  @ApiProperty({ type: String })
  name: any

  @ApiProperty({ type: String })
  unit: any

  @ApiProperty({ type: Number })
  amount: any
}
