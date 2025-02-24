import SearchBar from './search-bar'

export default function HomePageComponent({ userName }: { userName: string }) {
  return (
    <div className='flex w-screen flex-col px-4 pt-4 md:px-8'>
      <SearchBar userName={userName} />
    </div>
  )
}
