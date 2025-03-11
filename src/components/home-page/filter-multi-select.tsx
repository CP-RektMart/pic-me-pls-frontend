'use client'

import { Category } from '@/types/user'

import { MultiSelect } from '@/components/ui/multi-select'

export default function FilterMultiSelect({
  categories,
  selectedCategories,
  setSelectedCategories,
}: {
  categories: Category[]
  selectedCategories: string[]
  setSelectedCategories: (value: string[]) => void
}) {
  const categoriesList = categories.map(({ name }) => ({
    label: name ?? 'Unknown',
    value: name?.toLowerCase() ?? 'unknown',
  }))

  return (
    <div className='w-full'>
      <MultiSelect
        options={categoriesList}
        onValueChange={setSelectedCategories}
        value={selectedCategories}
        placeholder='Select Category'
        variant='inverted'
        animation={0}
        maxCount={1}
      />
    </div>
  )
}
