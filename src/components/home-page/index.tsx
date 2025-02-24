import { UserProfile } from '@/types/user'

import SearchBar from './search-bar'

export default function HomePageComponent({
  userProfile,
}: {
  userProfile: UserProfile
}) {
  return (
    <div className='flex w-screen flex-col px-4 pt-4 md:px-8'>
      <SearchBar userProfile={userProfile} />
    </div>
  )
}
