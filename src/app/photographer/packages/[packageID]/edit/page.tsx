import { getCategories } from '@/actions/get-categories'

import EditPackage from '@/components/photographer/package-page/edit-package'

export default async function EditPackagePage() {
  const categoriesResponse = await getCategories()
  const categories = categoriesResponse?.result?.data ?? []

  return <EditPackage categories={categories} />
}
