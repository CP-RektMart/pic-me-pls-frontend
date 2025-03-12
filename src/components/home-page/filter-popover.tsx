import { Category } from '@/types/user'

import FilterMultiSelect from './filter-multi-select'
import FilterPrice from './filter-price'

export default function FilterPopover({
  categories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedCategories,
  setSelectedCategories,
}: {
  categories: Category[]
  minPrice: string
  setMinPrice: (value: string) => void
  maxPrice: string
  setMaxPrice: (value: string) => void
  selectedCategories: string[]
  setSelectedCategories: (value: string[]) => void
}) {
  return (
    <div className='absolute -right-16 top-10 flex justify-center md:-right-12'>
      <div className='flex w-80 flex-col items-center justify-center gap-4 rounded-lg border border-gray-300 p-4 shadow-md'>
        <FilterPrice
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        <FilterMultiSelect
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
    </div>
  )
}
