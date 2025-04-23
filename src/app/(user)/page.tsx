import { getCategories } from '@/actions/get-categories'
import { getPackages } from '@/actions/packages/get-packages'
import { getMyProfile } from '@/actions/profile/get-my-profile'

import HomePageComponent from '@/components/home'

export default async function Home() {
  const profile = await getMyProfile()
  const categories = await getCategories()
  const packages = await getPackages({
    name: '',
    minPrice: 0,
    maxPrice: 0,
    categoryIds: [],
    page: 1,
    pageSize: 6,
  })

  return (
    <HomePageComponent
      profile={profile}
      categories={categories}
      initialPackages={packages}
    />
  )
}
