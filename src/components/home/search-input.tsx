import { Icon } from '@iconify/react'

import { Action, FilterState } from '@/components/home/filterReducer'
import { Button } from '@/components/ui/button'
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
      <Button
        onClick={onSearchClick}
        variant='ghost'
        className='absolute left-1.5 size-7 rounded-full p-0'
        data-testid='search-button'
      >
        <Icon icon='lucide:search' className='size-4' />
      </Button>
      <Input
        type='text'
        placeholder='Search packages'
        className='rounded-full pl-9'
        value={filters.searchText}
        onChange={(e) =>
          handleFilter({ type: 'searchText', payload: e.target.value })
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearchClick()
          }
        }}
        data-testid='search-input'
      />
    </div>
  )
}
