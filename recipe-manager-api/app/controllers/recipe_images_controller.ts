import type { HttpContext } from '@adonisjs/core/http'
import { updateRecipeImageValidator } from '#validators/recipe'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'

export default class RecipeImagesController {
  async update({ request, response }: HttpContext) {
    const { image } = await request.validateUsing(updateRecipeImageValidator)

    const uploadPath = process.env.UPLOAD_PATH ?? undefined

    if (uploadPath) {
      await image.move(app.makePath(uploadPath), {
        name: `${cuid()}.${image.extname}`,
      })

      return response.ok({ imageUrl: image.fileName! })
    }
    return response.status(500).send({ error: 'Internal server error while uploading image' })
  }
}
