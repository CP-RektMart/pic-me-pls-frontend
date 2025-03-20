import { getPackage } from '@/actions/packages/get-package-id'
import { notFound } from 'next/navigation'

import { PackagePage } from '@/components/package'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const packageId = (await params).id

  const packageData = await getPackage(packageId)
  if (!packageData) notFound()

  return <PackagePage package={packageData} />
}
