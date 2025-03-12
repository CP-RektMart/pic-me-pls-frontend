'use client'

import { Category } from '@/types/category'

import { MultiSelect } from '@/components/ui/multi-select'

export default function FilterMultiSelect({
  categories,
  selectedCategories,
  setSelectedCategories,
}: {
  categories: Category[]
  selectedCategories: number[]
  setSelectedCategories: (value: number[]) => void
}) {
  const categoriesList = categories.map(({ id, name }) => ({
    label: name ?? 'Unknown',
    value: id!.toString() ?? 'unknown',
  }))

  return (
    <div className='w-full'>
      <MultiSelect
        options={categoriesList}
        onValueChange={(values) => setSelectedCategories(values.map(Number))}
        value={selectedCategories.map(String)}
        placeholder='Select Category'
        variant='inverted'
        animation={0}
        maxCount={1}
      />
    </div>
  )
}
