import { getMyPackages } from '@/actions/photographer/get-my-packages'

import { PhotographerPackages } from '@/components/photographer/packages/packages-list'

export default async function Page() {
  const packages = await getMyPackages()

  return <PhotographerPackages packages={packages} />
}
