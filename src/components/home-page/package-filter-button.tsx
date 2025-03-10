'use client'

import { useState } from 'react'

import FilterButton from './filter-button'
import FilterPopover from './filter-popover'

export default function PackageFilterButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative'>
      <FilterButton OptionType='Filter' onClick={() => setIsOpen(!isOpen)} />
      {isOpen && <FilterPopover />}
    </div>
  )
}
