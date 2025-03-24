import { client } from '@/api/client'

export const createPaymentUrl = async (quotationId: number) => {
  const { data } = await client.POST(
    '/api/v1/stripe/checkout/quotations/{id}',
    {
      params: {
        path: {
          id: quotationId,
        },
      },
    }
  )
  return data?.checkout_url || undefined
}
