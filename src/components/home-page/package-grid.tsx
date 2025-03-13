import { PackageVerbose } from '@/types/package'
import { Icon } from '@iconify/react/dist/iconify.js'
import MockPhotoCard from '@public/images/mock-photo-card.jpg'

import PackageCard from '@/components/home-page/package-card'

interface PackageGridProps {
  packages: PackageVerbose[]
}

export default function PackageGrid({ packages }: PackageGridProps) {
  if (packages.length === 0) {
    return (
      <div className='flex min-h-[50vh] flex-col items-center justify-center gap-2'>
        <Icon icon='lucide:package' className='text-6xl text-gray-400' />
        <p className='font-medium text-gray-600'>No packages</p>
      </div>
    )
  }

  return (
    <div className='my-6 flex flex-wrap gap-4'>
      {packages.map((pkg, index) => (
        <PackageCard
          key={index}
          title={pkg.name || 'Unknown title'}
          photographer={pkg.photographer?.name || 'Annonymous'}
          category={pkg.category?.name || 'Unknown category'}
          price={pkg.price ? `${pkg.price}` : 'Price not available'}
          imageUrl={pkg.media?.[0]?.pictureUrl || MockPhotoCard.src}
          photographerId={pkg.photographer?.id}
          alt={pkg.name || 'package photo'}
        />
      ))}
    </div>
  )
}
