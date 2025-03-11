'use client'

import { useState } from 'react'

import FilterButton from './filter-button'
import FilterPopover from './filter-popover'

export default function PackageFilterButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  return (
    <div className='relative'>
      <FilterButton
        OptionType='Filter'
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div className={isOpen ? 'block' : 'hidden'}>
        <FilterPopover
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
    </div>
  )
}
