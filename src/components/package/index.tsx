'use client'

import { PackageVerbose } from '@/types/package'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Container } from '@/components/container'

import { ChatButton } from './chatButton'
import { DescriptionSection } from './descriptionSection'
import GoBackButton from './goBackButton'
import { HeaderImage } from './headerImage'
import { ProfileThumbnail } from './profileThumbnail'
import { ReviewsSection } from './reviewsSection'

interface PackageProps {
  package: PackageVerbose
}

export function PackagePage({ package: pkg }: PackageProps) {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className='mb-24 w-full'>
      <GoBackButton onClick={handleGoBack} />

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

          <div className='col-span-1 space-y-4 lg:col-span-4'>
            <div className='flex flex-col gap-4 rounded-lg border p-4'>
              <Link href={`/photographer/${pkg.photographer?.id}`} passHref>
                <ProfileThumbnail
                  profilePictureUrl={
                    pkg.photographer?.profilePictureUrl || '/default.jpg'
                  }
                  name={pkg.photographer?.name || 'Photographer Name'}
                  haveVerifiedBadge={true}
                  isVerified={pkg.photographer?.isVerified || false}
                  imageSize={50}
                />
              </Link>

              <p className='flex w-full justify-between text-sm text-gray-500'>
                <span>0 Packages</span>
                <span>0 Pending Jobs</span>
                <span>0 Jobs done</span>
                {/* TODO: Add real data here from the API */}
              </p>
              <ChatButton label='Start Chatting' />
            </div>
            <ReviewsSection reviews={pkg.reviews ?? []} />
          </div>
        </div>
      </Container>
    </div>
  )
}
