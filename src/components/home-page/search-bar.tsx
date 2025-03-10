import { UserProfile } from '@/types/user'

import FilterButton from './filter-button'
import Greeting from './gretting'
import PackageFilterButton from './package-filter-button'
import SearchInput from './search-input'

export default function SearchBar({
  userProfile,
}: {
  userProfile: UserProfile
}) {
  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center'>
      <Greeting userProfile={userProfile} />
      <div className='item-center flex w-full gap-3'>
        <SearchInput searchType='Package' />
        <PackageFilterButton />
        <FilterButton OptionType='Sort' />
      </div>
    </div>
  )
}
