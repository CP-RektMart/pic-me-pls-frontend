import { getCategories } from '@/actions/get-categories'
import { getQueryPackages } from '@/actions/package/get-query-packages'
import { client } from '@/api/client'
import { Package } from '@/types/package'
import ProfileMockImage from '@public/images/profile-mock-image.png'

import HomePageComponent from '@/components/home-page'
import { PackageProps } from '@/components/home-page/package-card'

export default async function Home() {
  const { data: profile } = await client.GET('/api/v1/me')

  const categoriesResponse = await getCategories()
  const categories = categoriesResponse?.result?.data ?? []

  const packagesResponse = await getQueryPackages({
    name: '',
    minPrice: 0,
    maxPrice: 0,
    categoryIds: [],
    page: 1,
    pageSize: 10,
  })
  const packagesData = packagesResponse?.data ?? []
  const packageProps: PackageProps[] = packagesData.map((pkg: Package) => ({
    title: pkg.name ?? 'Unknown title',
    photographer: pkg.photographer?.name ?? 'Annonymous',
    photographerId: Number(pkg.photographer?.id) ?? 'Unknown photographer',
    category: pkg.category?.name ?? 'Unknown category',
    price: pkg.price ? `${pkg.price}` : 'Price not available',
    imageUrl: pkg.media?.[0]?.pictureUrl ?? ProfileMockImage.src,
  }))
  const sortedPackages = [...packageProps].sort(
    (a, b) => Number(a.price) - Number(b.price)
  )

  if (!profile || !profile.result) {
    return (
      <HomePageComponent
        userProfile={undefined}
        categories={categories}
        initialPackages={sortedPackages}
      />
    )
  }
  const userProfile = profile.result

  return (
    <HomePageComponent
      userProfile={userProfile}
      categories={categories}
      initialPackages={sortedPackages}
    />
  )
}
