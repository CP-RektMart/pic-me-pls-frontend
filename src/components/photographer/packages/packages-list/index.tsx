import { PackageVerbose } from '@/types/package'
import Link from 'next/link'

import PackageGrid from '@/components/home-page/package-grid'
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
      <PackageGrid packages={packages} isPhotographer={true} />
    </Container>
  )
}
