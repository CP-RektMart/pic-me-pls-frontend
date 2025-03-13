import { PackageVerbose } from '@/types/package'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'

import PackageCard from '@/components/home-page/package-card'
import { Button } from '@/components/ui/button'

import Container from '../../../container'

interface PhotographerPackagesProps {
  packages: PackageVerbose[]
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
      {packages.length === 0 ? (
        <div className='flex min-h-[50vh] flex-col items-center justify-center gap-2'>
          <Icon icon='lucide:package' className='text-6xl text-gray-400' />
          <p className='font-medium text-gray-600'>No packages</p>
        </div>
      ) : (
        <div className='my-6 flex flex-wrap gap-4'>
          {packages.map((pkg, index) => (
            <Link href={`/photographer/packages/${pkg.id}/edit`} key={index}>
              <PackageCard
                title={`${pkg.name}`}
                photographer={`${pkg.photographer?.name || 'Anonymous'}`}
                photographerId={pkg.photographer?.id}
                price={`${pkg.price}`}
                category={`${pkg.category ? pkg.category.name : ''}`}
                imageUrl={pkg.media?.[0]?.pictureUrl || ''}
              />
            </Link>
          ))}
        </div>
      )}
    </Container>
  )
}
