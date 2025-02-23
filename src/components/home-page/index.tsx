import SearchFilterButton from './filter-button'
import Greeting from './gretting'
import SearchInput from './search-input'

export default function HomePageComponent() {
  return (
    <div className='flex flex-col gap-2'>
      <div>kuy</div>
      <SearchFilterButton searchOptionType='Sort' />
      <SearchFilterButton searchOptionType='Filter' />
      <SearchInput searchType='Package' />
      <Greeting Name='Patthapol Kittikun' />
    </div>
  )
}
