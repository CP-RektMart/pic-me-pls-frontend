import SearchFilterButton from './filter-button'
import Greeting from './gretting'
import SearchInput from './search-input'

export default function SearchBar() {
  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center'>
      <Greeting Name='Patthapol Kittikun' />
      <div className='item-center flex w-full gap-3'>
        <SearchInput searchType='Package' />
        <SearchFilterButton searchOptionType='Sort' />
        <SearchFilterButton searchOptionType='Filter' />
      </div>
    </div>
  )
}
