import { Category } from '@/types/user'

import FilterButton from './filter-button'
import { Action, FilterState } from './filterReducer'
import PackageFilterButton from './package-filter-button'
import SearchInput from './search-input'

interface SearchBarProps {
  categories: Category[]
  filters: FilterState
  handleFilter: React.Dispatch<Action>
}

export default function SearchBar({
  categories,
  filters,
  handleFilter,
}: SearchBarProps) {
  return (
    <div className='item-center flex w-full gap-3'>
      <SearchInput searchType='Package' />
      <PackageFilterButton
        categories={categories}
        filters={filters}
        handleFilter={handleFilter}
      />
      <FilterButton
        OptionType='Sort'
        onClick={() => handleFilter({ type: 'sort', payload: 'ASC' })}
      />
    </div>
  )
}
