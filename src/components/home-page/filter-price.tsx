'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'

export default function FilterPrice() {
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')

  const preventNegativeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault()
    }
  }

  return (
    <div className='flex justify-center gap-4'>
      <div className='flex flex-col gap-1'>
        <div className='text-sm font-medium'>Min Price (Baht)</div>
        <Input
          placeholder='200.00'
          type='number'
          min='0'
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onKeyDown={preventNegativeInput}
          className='[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <div className='text-sm font-medium'>Max Price (Baht)</div>
        <Input
          placeholder='1000.50'
          type='number'
          min='0'
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onKeyDown={preventNegativeInput}
          className='[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
        />
      </div>
    </div>
  )
}
