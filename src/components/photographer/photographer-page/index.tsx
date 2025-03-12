import { mockPackages } from '@/data/packagecards'

import ProfileHeader from '@/components/customer-quotation/profile-header'
import { PackageProps } from '@/components/home-page/package-card'
import PackageGrid from '@/components/home-page/package-grid'

// import SearchInput from '@/components/home-page/search-input'

interface PhotographerPageProps {
  imageUrl: string
  photographerName: string
  packageNums: number
  packagecards: PackageProps[]
}

export default function PhotographerPage({
  imageUrl = '/image.png',
  photographerName = 'Default Name',
  packageNums = 0,
  packagecards = mockPackages,
}: PhotographerPageProps) {
  return (
    <div className='max-w-screen flex w-full flex-col px-4 pt-4 md:px-32'>
      <div className='flex w-full flex-col gap-4 md:flex-row md:items-center'>
        <ProfileHeader
          imageUrl={imageUrl}
          name={photographerName}
          packageNumber={packageNums}
        />
      </div>
      <div className='mt-6'>{/* <SearchInput searchType='Package' /> */}</div>
      <div className='my-6'>
        <PackageGrid packagecards={packagecards} />
      </div>
    </div>
  )
}
