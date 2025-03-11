import { User } from '@/types/user'

import Greeting from './greeting'
import SearchBar from './search-bar'

export default function HomePageComponent({
  userProfile,
}: {
  userProfile?: User
}) {
  return (
    <div className='max-w-screen flex w-full flex-col px-4 pt-4 md:px-32'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        <Greeting userProfile={userProfile} />
        <SearchBar />
        {/* <FilterPopover /> */}
      </div>
    </div>
  )
}
