import { getPhotograhperPackages } from '@/actions/get-photographer-packages'
import { PackageVerbose } from '@/types/package'
import { Icon } from '@iconify/react/dist/iconify.js'

import Container from '@/components/container'
import PhotographerPage from '@/components/photographer/photographer-page'

interface PhotographerProfileProps {
  imageUrl: string
  name: string
  packageNumber: number
  photographerId: number
}

interface PackageProps {
  title: string
  photographer: string
  price: string
  category: string
  imageUrl: string
  alt?: string
  onClick?: () => void
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const photographerId = resolvedParams?.id ?? 'unknown'

  const packagesResponse = await getPhotograhperPackages({
    photographerId: Number(photographerId),
    name: '',
  })

  const packagesData = packagesResponse?.data ?? []
  const photographer = packagesData[0]?.photographer

  if (!photographer) {
    return (
      <Container className='py-6'>
        <div className='flex min-h-[50vh] flex-col items-center justify-center gap-2'>
          <Icon icon='lucide:package' className='text-6xl text-gray-400' />
          <p className='font-medium text-gray-600'>No packages</p>
        </div>
      </Container>
    )
  }

  const profileProps: PhotographerProfileProps = {
    imageUrl: photographer.profilePictureUrl ?? '/image.png',
    name: photographer.name ?? 'Anonymous',
    packageNumber: packagesData.length,
    photographerId: Number(photographer.id),
  }

  const packageProps: PackageProps[] = packagesData.map(
    (pkg: PackageVerbose) => ({
      title: pkg.name ?? 'Unknown title',
      photographer: pkg.photographer?.name ?? 'Annonymous',
      category: pkg.category?.name ?? 'Unknown category',
      price: pkg.price ? `${pkg.price}` : 'Price not available',
      imageUrl: pkg.media?.[0]?.pictureUrl || '',
    })
  )

  return (
    <PhotographerPage
      photographerProfile={profileProps}
      initialPhotographerPackages={packageProps}
    />
  )
}
