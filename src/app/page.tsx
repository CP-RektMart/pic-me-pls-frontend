import { getCategories } from '@/actions/get-categories'
import { getPackages } from '@/actions/get-packages'
import { client } from '@/api/client'

import HomePageComponent from '@/components/home-page'

export default async function Home() {
  const { data: profile } = await client.GET('/api/v1/me')

  const categoriesResponse = await getCategories()
  const categories = categoriesResponse?.result?.data ?? []

  const packagesResponse = await getPackages({
    name: '',
    minPrice: 0,
    maxPrice: 0,
    categoryIds: [],
    page: 1,
    pageSize: 10,
  })
  const packages = packagesResponse?.data ?? []
  console.log(packages)

  const handleOnSearchClick = () => {
    console.log('search clicked')
  }

  if (!profile || !profile.result) {
    return (
      <HomePageComponent
        userProfile={undefined}
        categories={categories}
        onSearchClick={handleOnSearchClick}
      />
    )
  }
  const userProfile = profile.result

  return (
    <HomePageComponent
      userProfile={userProfile}
      categories={categories}
      onSearchClick={handleOnSearchClick}
    />
  )
}
