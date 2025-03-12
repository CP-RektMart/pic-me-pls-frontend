import { Icon } from '@iconify/react'

import { Input } from '@/components/ui/input'

export default function SearchInput({
  onSearchClick,
}: {
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
      />
    </div>
  )
}
