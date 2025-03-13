import { Icon } from '@iconify/react'

import { Input } from '@/components/ui/input'

interface SearchInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearchClick: () => void
}

export default function SearchInput({
  value,
  onChange,
  onSearchClick,
}: SearchInputProps) {
  return (
    <div className='relative flex w-full items-center'>
      <Icon
        icon='lucide:search'
        className='absolute left-3 size-4 hover:cursor-pointer'
        onClick={onSearchClick}
      />
      <Input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={'Search Package'}
        className='rounded-full pl-8'
      />
    </div>
  )
}
