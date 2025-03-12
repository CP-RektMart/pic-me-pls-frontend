import { getCategories } from '@/actions/get-categories'
import { client } from '@/api/client'

import HomePageComponent from '@/components/home-page'

export default async function Home() {
  const { data: profile } = await client.GET('/api/v1/me')

  const categoriesResponse = await getCategories()
  const categories = categoriesResponse?.result?.data ?? []

  if (!profile || !profile.result) {
    return <HomePageComponent userProfile={undefined} categories={categories} />
  }
  const userProfile = profile.result

  return <HomePageComponent userProfile={userProfile} categories={categories} />
}
