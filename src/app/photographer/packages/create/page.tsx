import { getCategories } from '@/actions/get-categories'

import CreatePackage from '@/components/photographer/packages/create/create-package'

export default async function CreatePackagePage() {
  const categoriesWithPagination = await getCategories()
  const categories = categoriesWithPagination.data ?? []

  return <CreatePackage categories={categories} />
}
