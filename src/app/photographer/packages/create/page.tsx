import { getCategories } from '@/actions/get-categories'

import CreatePackage from '@/components/photographer/package-page/create-package'

export default async function CreatePackagePage() {
  const categoriesResponse = await getCategories()
  const categories = categoriesResponse?.result?.data ?? []

  return <CreatePackage categories={categories} />
}
