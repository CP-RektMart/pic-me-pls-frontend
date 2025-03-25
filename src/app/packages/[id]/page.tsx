import { getPackage } from '@/actions/packages/get-package-id'
import { getPhotograhperPackages } from '@/actions/photographers/get-photographer-packages'
import { getReviews } from '@/actions/review/get-reviews'
import { notFound } from 'next/navigation'

import { PackagePage } from '@/components/package'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const packageId = (await params).id
  let totalPackage = 0

  const packageData = await getPackage(packageId)
  if (!packageData) notFound()
  if (packageData.photographer?.id) {
    const packagesWithPagination = await getPhotograhperPackages({
      photographerId: packageData.photographer.id,
    })
    totalPackage = packagesWithPagination.data.length
  }

  const reviewsData = await getReviews(Number(packageId))

  return (
    <PackagePage
      package={packageData}
      photographerTotalPackage={totalPackage}
      reviews={reviewsData}
    />
  )
}
