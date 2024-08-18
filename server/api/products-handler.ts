// this function creates a new product and returns the product
const STRIPE_SK_DEV = process.env.STRIPE_SK_DEV
const STRIPE_SK_PROD = process.env.STRIPE_SK_PROD
const BASE_URL = process.env.CONTEXT === 'production' ? process.env.BASE_URL : 'http://localhost:3000'
const headers = {
  'Access-Control-Allow-Origin': BASE_URL,
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default defineEventHandler(async (event) => {
  // CORS
  if (event.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
    }
  }

  if (event.method === 'GET' || event.method === 'PUT') {
    sendError(
      event,
      createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      }),
    )

    return
  }

  if (event.method === 'POST') {
    const entity = await readBody(event)
    const ENV = entity.environment
    const DEFAULT_PRODUCT_VALUE = 'PRODUCT_WILL_BE_CREATED'
    const STRIPE_SK = ENV === 'production' ? STRIPE_SK_PROD : STRIPE_SK_DEV
    const stripe = require('stripe')(STRIPE_SK)

    if (entity.product !== DEFAULT_PRODUCT_VALUE) {
      sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Product field already populated',
        }),
      )

      return
    }
    let product
    try {
      product = await stripe.products.create({
        name: entity.title,
        description: entity.description,
        images: [entity.cover],
      })
    } catch (error: any) {
      console.error('Error Creating product:', error)

      sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: error.message,
        }),
      )

      return
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(product),
    }
  }

  if (event.method === 'DELETE') {
    const entity = await readBody(event)
    const ENV = entity.environment
    const STRIPE_GENERAL_PRODUCT =
      ENV === 'production' ? process.env.STRIPE_GENERAL_PRODUCT_ID_PROD : process.env.STRIPE_GENERAL_PRODUCT_ID_DEV
    const STRIPE_SK = ENV === 'production' ? STRIPE_SK_PROD : STRIPE_SK_DEV
    const stripe = require('stripe')(STRIPE_SK)

    if (entity.product === STRIPE_GENERAL_PRODUCT) {
      sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Cannot delete the general product',
        }),
      )

      return
    }

    let product
    try {
      product = await stripe.products.del(entity.product)
    } catch (error: any) {
      console.error('Error Deleting Product:', error)

      sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: error.message,
        }),
      )
      return
    }
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(product),
    }
  }
})
