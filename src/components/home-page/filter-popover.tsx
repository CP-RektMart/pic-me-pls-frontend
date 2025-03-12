import { Category } from '@/types/user'

import FilterMultiSelect from '@/components/home-page/filter-multi-select'
import FilterPrice from '@/components/home-page/filter-price'

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
  selectedCategories: number[]
  setSelectedCategories: (value: number[]) => void
}) {
  return (
    <div className='absolute -right-16 top-10 z-50 flex justify-center md:-right-12'>
      <div className='flex w-80 flex-col items-center justify-center gap-4 rounded-lg border border-gray-300 bg-white p-4 shadow-md'>
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
