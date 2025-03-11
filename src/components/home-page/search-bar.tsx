import FilterButton from './filter-button'
import PackageFilterButton from './package-filter-button'
import SearchInput from './search-input'

export default function SearchBar() {
  return (
    <div className='item-center flex w-full gap-3'>
      <SearchInput searchType='Package' />
      <PackageFilterButton />
      <FilterButton OptionType='Sort' />
    </div>
  )
}
