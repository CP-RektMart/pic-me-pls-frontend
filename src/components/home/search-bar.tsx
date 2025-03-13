import { Category } from '@/types/category'

import { Action, FilterState } from '@/components/home/filterReducer'
import PackageFilterButton from '@/components/home/package-filter-button'
import SearchInput from '@/components/home/search-input'
import SortFilterButton from '@/components/home/sort-filter-button'

interface SearchBarProps {
  categories: Category[]
  filters: FilterState
  handleFilter: React.Dispatch<Action>
  onSearchClick: () => void
}

export default function SearchBar({
  categories,
  filters,
  handleFilter,
  onSearchClick,
}: SearchBarProps) {
  return (
    <div className='item-center flex w-full gap-3'>
      <SearchInput
        filters={filters}
        handleFilter={handleFilter}
        onSearchClick={onSearchClick}
      />
      <PackageFilterButton
        categories={categories}
        filters={filters}
        handleFilter={handleFilter}
      />
      <SortFilterButton filters={filters} handleFilter={handleFilter} />
    </div>
  )
}
