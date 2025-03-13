import { getPhotograhperPackages } from '@/actions/get-photographer-packages'
import { getPhotographer } from '@/actions/photographers/get-photographer'
import { notFound } from 'next/navigation'

import PhotographerPage from '@/components/photographer/photographer-page'

interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageProps) {
  const photographerId = params.id

  const photographer = await getPhotographer(Number(photographerId))

  if (!photographer) notFound()

  const packagesWithPagination = await getPhotograhperPackages({
    photographerId: Number(photographerId),
  })

  return (
    <PhotographerPage
      photographer={photographer}
      packagesWithPagination={packagesWithPagination}
    />
  )
}
