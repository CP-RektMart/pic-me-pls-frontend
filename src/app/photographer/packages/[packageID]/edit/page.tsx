import { getCategories } from '@/actions/get-categories'
import { client } from '@/api/client'
import { notFound } from 'next/navigation'

import { EditPackage } from '@/components/photographer/packages/edit/edit-package'

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ packageID: string }>
}) {
  const categoriesWithPagination = await getCategories()
  const categories = categoriesWithPagination.data ?? []

  const packageID = (await params).packageID

  const { data: initialPackage } = await client.GET('/api/v1/packages/{id}', {
    params: { path: { id: packageID } },
  })

  if (!initialPackage || !initialPackage.result) {
    notFound()
  }

  return (
    <EditPackage
      categories={categories}
      initialPackage={initialPackage.result}
    />
  )
}
