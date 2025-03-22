'use client'

import FilterButton from '@/components/home/filter-button'
import { Action, FilterState } from '@/components/home/filterReducer'

export default function SortFilterButton({
  filters,
  handleFilter,
}: {
  filters: FilterState
  handleFilter: React.Dispatch<Action>
}) {
  return (
    <FilterButton
      OptionType='Sort'
      onClick={() =>
        handleFilter({
          type: 'sort',
          payload: filters.sort === 'ASC' ? 'DESC' : 'ASC',
        })
      }
    />
  )
}
