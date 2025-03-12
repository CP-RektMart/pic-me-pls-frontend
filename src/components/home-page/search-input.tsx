import { Icon } from '@iconify/react'

import { Action, FilterState } from '@/components/home-page/filterReducer'
import { Input } from '@/components/ui/input'

export default function SearchInput({
  filters,
  handleFilter,
  onSearchClick,
}: {
  filters: FilterState
  handleFilter: React.Dispatch<Action>
  onSearchClick: () => void
}) {
  return (
    <div className='relative flex w-full items-center'>
      <Icon
        icon='lucide:search'
        className='absolute left-3 size-4 hover:cursor-pointer'
        onClick={onSearchClick}
      />
      <Input
        type='text'
        placeholder={'Search Package'}
        className='rounded-full pl-8'
        value={filters.searchText}
        onChange={(e) =>
          handleFilter({ type: 'searchText', payload: e.target.value })
        }
      />
    </div>
  )
}
