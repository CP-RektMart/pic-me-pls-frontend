import ProfileMockImage from '@public/images/profile-mock-image.png'

export interface Review {
  id: number
  reviewer: string
  comment: string
  rating: number
  reviewerProfilePic: string
}

const mockReviews: Review[] = [
  {
    id: 1,
    reviewer: 'John Doe',
    comment:
      'Great product, I love it! I would recommend it to everyone. Great product, I love it! I would recommend it to everyone. Great product, I love it! I would recommend it to everyone.',
    rating: 5,
    reviewerProfilePic: ProfileMockImage.src,
  },
  {
    id: 2,
    reviewer: 'Jane Doe',
    comment: 'I like it, but it could be better',
    rating: 4,
    reviewerProfilePic: ProfileMockImage.src,
  },
  {
    id: 3,
    reviewer: 'Jack Doe',
    comment: 'Great product, I love it!',
    rating: 5,
    reviewerProfilePic: ProfileMockImage.src,
  },
  {
    id: 4,
    reviewer: 'James Doe',
    comment: 'I like it, but it could be better',
    rating: 4,
    reviewerProfilePic: ProfileMockImage.src,
  },
  {
    id: 5,
    reviewer: 'Joe Doe',
    comment: 'Great product, I love it!',
    rating: 5,
    reviewerProfilePic: ProfileMockImage.src,
  },
]

export function getReviews(): Review[] {
  return mockReviews
}
