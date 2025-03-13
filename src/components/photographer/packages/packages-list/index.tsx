import { Package } from '@/types/package'
import MockPhotoCard from '@public/images/mock-photo-card.jpg'
import Link from 'next/link'

import PackageCard from '@/components/home-page/package-card'
import { Button } from '@/components/ui/button'

import Container from '../../../container'

interface PhotographerPackagesProps {
  packages: Package[]
}

export function PhotographerPackages(props: PhotographerPackagesProps) {
  const { packages } = props

  return (
    <Container className='py-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>My Packages</h1>
        <Link href='/photographer/packages/create'>
          <Button>New Package</Button>
        </Link>
      </div>
      <div className='my-6 flex flex-wrap gap-4'>
        {packages.map((pkg, index) => (
          <PackageCard
            key={index}
            title={`${pkg.name}`}
            photographer={''}
            price={`${pkg.price}`}
            category={`${pkg.category ? pkg.category.name : ''}`}
            imageUrl={MockPhotoCard.src}
          />
        ))}
      </div>
    </Container>
  )
}
