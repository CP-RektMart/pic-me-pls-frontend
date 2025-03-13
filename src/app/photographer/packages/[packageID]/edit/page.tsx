import { getCategories } from '@/actions/get-categories'
import { client } from '@/api/client'

import EditPackage from '@/components/photographer/package-page/edit-package'

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ packageID: string }>
}) {
  const categoriesResponse = await getCategories()
  const categories = categoriesResponse?.result?.data ?? []

  const packageID = (await params).packageID

  const { data: initialPackage } = await client.GET('/api/v1/packages/{id}', {
    params: { path: { id: packageID } },
  })

  console.log({ packageID, initialPackage })

  if (!initialPackage || !initialPackage.result) {
    return <div>Package not found</div>
  }

  return (
    <EditPackage
      categories={categories}
      initialPackage={initialPackage.result}
    />
  )
}
