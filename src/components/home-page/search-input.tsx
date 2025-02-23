import { Icon } from '@iconify/react'

import { Input } from '../ui/input'

export default function SearchInput({
  searchType,
}: {
  searchType: 'Package' | 'Photographer' | ''
}) {
  return (
    <div className='relative flex w-full items-center md:ml-10'>
      <Icon icon='lucide:search' className='absolute left-3 size-4' />
      <Input
        type='text'
        placeholder={
          searchType === 'Package'
            ? 'Search Package'
            : searchType === 'Photographer'
              ? 'Search Photographer'
              : ''
        }
        className='rounded-full pl-8'
      />
    </div>
  )
}
