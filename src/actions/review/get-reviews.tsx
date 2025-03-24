'use server'

import { client } from '@/api/client'

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

export interface Review {
  id: number
  reviewer: string
  comment: string
  rating: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
  reviewerProfilePic: string
}

export async function getReviews(packageID: number): Promise<Review[]> {
  let data
  try {
    data = await client.GET('/api/v1/customer/packages/:packageID/reviews', {
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

  const reviewData = data.data as ReviewResponse[]

  return reviewData.map(
    (review: ReviewResponse): Review => ({
      id: review.id || 0,
      reviewer: review.customer.name || '',
      comment: review.comment || '',
      rating: review.rating || 0,
      reviewerProfilePic: review.customer.profilePictureUrl || '',
    })
  )
}
