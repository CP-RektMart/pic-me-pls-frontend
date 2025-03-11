'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

import FilterButton from './filter-button'
import FilterPopover from './filter-popover'
import { Action, FilterState } from './filterReducer'

interface PackageFilterButtonProps {
  filters: FilterState
  handleFilter: React.Dispatch<Action>
}

export default function PackageFilterButton({
  filters,
  handleFilter,
}: PackageFilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative'>
      <FilterButton
        OptionType='Filter'
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div className={cn(isOpen ? 'block' : 'hidden')}>
        <FilterPopover
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          selectedCategories={filters.categories}
          setMinPrice={(value) =>
            handleFilter({ type: 'minPrice', payload: value })
          }
          setMaxPrice={(value) =>
            handleFilter({ type: 'maxPrice', payload: value })
          }
          setSelectedCategories={(categories) =>
            handleFilter({ type: 'category', payload: categories })
          }
        />
      </div>
    </div>
  )
}
