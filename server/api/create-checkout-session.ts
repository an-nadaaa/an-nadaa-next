import Stripe from 'stripe'

const STRIPE_SK = process.env.CONTEXT === 'production' ? process.env.STRIPE_SK_PROD : process.env.STRIPE_SK_DEV
const BASE_URL = process.env.CONTEXT === 'production' ? process.env.BASE_URL : 'http://localhost:3000'
const STRIPE_GENERAL_PRODUCT =
  process.env.CONTEXT === 'production'
    ? process.env.STRIPE_GENERAL_PRODUCT_ID_PROD
    : process.env.STRIPE_GENERAL_PRODUCT_ID_DEV

const stripe = new Stripe(STRIPE_SK as string)
const headers = {
  'Access-Control-Allow-Origin': BASE_URL,
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  setHeaders(event, headers)

  // CORS
  if (event.method === 'OPTIONS') {
    setResponseStatus(event, 200)

    return {
      statusCode: 200,
    }
  }
  // your server-side functionality
  let session
  try {
    session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            unit_amount_decimal: query.amount as string,
            currency: 'usd',
            product: (query.product ? query.product : STRIPE_GENERAL_PRODUCT) as string,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${BASE_URL}${query.locale === 'en' ? '' : `/${query.locale}`}/success`,
      cancel_url: `${BASE_URL}${query.locale === 'en' ? '' : `/${query.locale}`}/causes`,
      locale: query.locale as any,
      // payment_method_types: ['card', 'fpx', 'grabpay', 'alipay'],
    })
  } catch (error: any) {
    sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
  }

  return {
    statusCode: 200,
    session,
  }
})
