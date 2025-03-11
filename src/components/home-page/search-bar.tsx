import FilterButton from './filter-button'
import { Action, FilterState } from './filterReducer'
import PackageFilterButton from './package-filter-button'
import SearchInput from './search-input'

interface SearchBarProps {
  filters: FilterState
  handleFilter: React.Dispatch<Action>
}

export default function SearchBar({ filters, handleFilter }: SearchBarProps) {
  return (
    <div className='item-center flex w-full gap-3'>
      <SearchInput searchType='Package' />
      <PackageFilterButton filters={filters} handleFilter={handleFilter} />
      <FilterButton
        OptionType='Sort'
        onClick={() => handleFilter({ type: 'sort', payload: 'ASC' })}
      />
    </div>
  )
}
