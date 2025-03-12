'use client'

import { mockPackages } from '@/data/packagecards'
import { mockPhotographer } from '@/data/photographer'

import PhotographerPage from '@/components/photographer/photographer-page'

export default function Page() {
  // TODO: Get real photographer data

  const profile = mockPhotographer

  const packageNums = mockPackages.length || 0
  const imageUrl = profile.profilePictureUrl || '/image.png'
  const userName = profile.name || 'Default Name'

  return (
    <PhotographerPage
      imageUrl={imageUrl}
      photographerName={userName}
      packageNums={packageNums}
      packagecards={mockPackages}
    />
  )
}
