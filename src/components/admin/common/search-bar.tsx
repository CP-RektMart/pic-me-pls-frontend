'use client'

import { ChangeEvent, KeyboardEvent } from 'react'

import { Icon } from '@iconify/react/dist/iconify.js'

import { Input } from '@/components/ui/input'

interface SearchBarProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
  placeholder?: string
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search',
}: SearchBarProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className='relative mb-2'>
      <Input
        type='text'
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className='min-h-10 rounded-full pl-9'
      />
      <Icon
        icon='lucide:search'
        className='absolute left-3 top-1/2 -translate-y-1/2 transform'
      />
    </div>
  )
}
