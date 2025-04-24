'use server'

import { client } from '@/api/client'

export const getMyCitizenCard = async () => {
  const { data: citizenCard, response } = await client.GET(
    '/api/v1/photographer/citizen-card'
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Failed to fetch citizen card')
  }

  return citizenCard?.result
}
