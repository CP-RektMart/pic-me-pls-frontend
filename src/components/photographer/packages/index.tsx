import { PackageVerbose } from '@/types/package'
import Link from 'next/link'

import PackageGrid from '@/components/home/package-grid'
import { SidebarProvider } from '@/components/photographer/common/sidebar-provider'
import { Button } from '@/components/ui/button'

interface PhotographerPackagesProps {
  packages: PackageVerbose[]
}

export function PhotographerPackages(props: PhotographerPackagesProps) {
  const { packages } = props

  return (
    <SidebarProvider>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Packages</h1>
        <Link href='/photographer/packages/create'>
          <Button>New Package</Button>
        </Link>
      </div>
      <PackageGrid packages={packages} isPhotographer={true} />
    </SidebarProvider>
  )
}
