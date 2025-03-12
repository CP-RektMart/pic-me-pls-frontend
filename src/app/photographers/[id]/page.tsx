import { getPhotograhperPackages } from '@/actions/get-photographer-packages'
import { Package } from '@/types/package'

import PhotographerPage from '@/components/photographer/photographer-page'

interface PhotographerProfileProps {
  imageUrl: string
  name: string
  packageNumber: number
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

export default async function Page({ params }: { params: { id: string } }) {
  const photographerId = params?.id ?? 'unknown'

  const packagesResponse = await getPhotograhperPackages({
    photographerId: Number(photographerId),
  })

  const packagesData = packagesResponse?.data ?? []
  const photographer = packagesData[0]?.photographer
  console.log(packagesData)

  if (!photographer) {
    return <div>Photographer not found</div>
  }

  const profileProps: PhotographerProfileProps = {
    imageUrl: photographer.profilePictureUrl ?? '/image.png',
    name: photographer.name ?? 'Anonymous',
    packageNumber: packagesData.length,
  }

  const packageProps: PackageProps[] = packagesData.map((pkg: Package) => ({
    title: pkg.name ?? 'Unknown title',
    photographer: pkg.photographer?.name ?? 'Annonymous',
    category: pkg.category?.name ?? 'Unknown category',
    price: pkg.price ? `${pkg.price}` : 'Price not available',
    imageUrl: pkg.media?.[0]?.pictureUrl ?? '/profile-mock-image.png',
  }))

  return (
    <PhotographerPage
      photographerProfile={profileProps}
      photographerPackages={packageProps}
    />
  )
}
