import FilterMultiSelect from './filter-multi-select'
import FilterPrice from './filter-price'

export default function FilterPopover() {
  return (
    <div className='flex justify-center'>
      <div className='flex w-80 flex-col items-center justify-center gap-4 rounded-lg border border-gray-300 p-4 shadow-md'>
        <FilterPrice />
        <FilterMultiSelect />
      </div>
    </div>
  )
}
