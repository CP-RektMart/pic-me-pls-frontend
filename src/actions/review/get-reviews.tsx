'use server'

import { client } from '@/api/client'
import { Review } from '@/types/package'

interface ReviewResponse {
  comment: string
  rating: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
  id: number
  customer: {
    name: string
    profilePictureUrl: string
    email: string
    phoneNumber: string
    id: number
  }
}

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

  const reviewData = data.data.data as ReviewResponse[]

  return reviewData.map(
    (review: ReviewResponse): Review => ({
      id: review.id || 0,
      comment: review.comment || '',
      rating: review.rating || 0,
      customer: {
        id: review.customer.id,
        email: review.customer.email,
        phoneNumber: review.customer.phoneNumber,
        name: review.customer.name,
        profilePictureUrl: review.customer.profilePictureUrl,
      },
    })
  )
}
