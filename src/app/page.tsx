import { getCategories } from '@/actions/get-categories'
import { getPackages } from '@/actions/packages/get-packages'
import { getMyProfile } from '@/actions/profile/get-my-profile'

import HomePageComponent from '@/components/home-page'

export default async function Home() {
  const profile = await getMyProfile()
  const categories = await getCategories()
  const packages = await getPackages({
    name: '',
    minPrice: 0,
    maxPrice: 0,
    categoryIds: [],
    page: 1,
    pageSize: 10,
  })

  // const packagesData = packagesResponse?.data ?? []
  // const packageProps: PackageProps[] = packagesData.map(
  //   (pkg: PackageVerbose) => ({
  //     title: pkg.name ?? 'Unknown title',
  //     photographer: pkg.photographer?.name ?? 'Annonymous',
  //     photographerId: Number(pkg.photographer?.id) ?? 'Unknown photographer',
  //     category: pkg.category?.name ?? 'Unknown category',
  //     price: pkg.price ? `${pkg.price}` : 'Price not available',
  //     imageUrl: pkg.media?.[0]?.pictureUrl || '',
  //   })
  // )
  // const sortedPackages = [...packageProps].sort(
  //   (a, b) => Number(a.price) - Number(b.price)
  // )

  return (
    <HomePageComponent
      profile={profile}
      categories={categories}
      initialPackages={packages}
    />
  )
}
