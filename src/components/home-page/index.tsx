import { UserProfile } from '@/types/user'

import FilterPopover from './filter-popover'
import SearchBar from './search-bar'

export default function HomePageComponent({
  userProfile,
}: {
  userProfile: UserProfile
}) {
  return (
    <div className='max-w-screen flex w-full flex-col px-4 pt-4 md:px-32'>
      <SearchBar userProfile={userProfile} />
      <FilterPopover />
    </div>
  )
}
