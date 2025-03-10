import FilterMultiSelect from './filter-multi-select'
import FilterPrice from './filter-price'

export default function FilterPopover() {
  return (
    <div className='absolute -right-16 top-10 flex justify-center md:-right-12'>
      <div className='flex w-80 flex-col items-center justify-center gap-4 rounded-lg border border-gray-300 p-4 shadow-md'>
        <FilterPrice />
        <FilterMultiSelect />
      </div>
    </div>
  )
}
