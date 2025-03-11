import { User } from '@/types/user'

import SearchBar from './search-bar'

export default function HomePageComponent({
  userProfile,
}: {
  userProfile?: User
}) {
  return (
    <div className='max-w-screen flex w-full flex-col px-4 pt-4 md:px-32'>
      <SearchBar userProfile={userProfile} />
      {/* <FilterPopover /> */}
    </div>
  )
}
