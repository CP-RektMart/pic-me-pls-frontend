'use server'

import { client } from '@/api/client'

export async function getReviews(packageID: number) {
  let data
  try {
    data = await client.GET('/api/v1/packages/{packageID}/reviews', {
      params: {
        path: {
          packageID: packageID,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }

  if (!data || !data.data) {
    return []
  }

  const reviewData = data.data.data

  return reviewData
}
