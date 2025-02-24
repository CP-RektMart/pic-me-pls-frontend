import SearchFilterButton from './filter-button'
import Greeting from './gretting'
import SearchInput from './search-input'

export default function SearchBar({ userName }: { userName: string }) {
  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center'>
      {/* <Greeting userName='Pattapol Kittikul' /> */}
      <Greeting userName={userName} />
      <div className='item-center flex w-full gap-3'>
        <SearchInput searchType='Package' />
        <SearchFilterButton searchOptionType='Sort' />
        <SearchFilterButton searchOptionType='Filter' />
      </div>
    </div>
  )
}
