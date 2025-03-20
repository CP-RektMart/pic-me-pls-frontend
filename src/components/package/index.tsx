'use client'

import { PackageVerbose } from '@/types/package'

import { Container } from '@/components/container'

import { ChatButton } from './chatButton'
import { DescriptionSection } from './descriptionSection'
import { HeaderImage } from './headerImage'
import { PhotographerProfile } from './photographerProfile'
import { ReviewsSection } from './reviewsSection'

interface PackageProps {
  package: PackageVerbose
}

export function PackagePage({ package: pkg }: PackageProps) {
  return (
    <div className='mb-24 w-full'>
      <HeaderImage
        imageUrl={pkg.media?.[0]?.pictureUrl || '/default.jpg'}
        title={pkg.name || 'Package image'}
      />

      <Container className='mt-6'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          <DescriptionSection
            description={pkg.description || 'No description'}
            media={pkg.media ?? []}
          />

          <div className='col-span-1 lg:col-span-4'>
            <div className='flex flex-col gap-4 rounded-lg border p-4'>
              <PhotographerProfile
                profilePictureUrl={
                  pkg.photographer?.profilePictureUrl || '/default.jpg'
                }
                name={pkg.photographer?.name || 'Photographer Name'}
              />
              <ChatButton label='Start Chatting' />
            </div>
            <ReviewsSection reviews={pkg.reviews ?? []} />
          </div>
        </div>
      </Container>
    </div>
  )
}
