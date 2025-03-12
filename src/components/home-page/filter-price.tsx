'use client'

import { Input } from '@/components/ui/input'

export default function FilterPrice({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: {
  minPrice: string
  setMinPrice: (value: string) => void
  maxPrice: string
  setMaxPrice: (value: string) => void
}) {
  const preventNegativeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault()
    }
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value.startsWith('0')) {
      setMinPrice(value)
    }
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value.startsWith('0')) {
      setMaxPrice(value)
    }
  }

  return (
    <div className='flex justify-center gap-4'>
      <div className='flex flex-col gap-1'>
        <div className='text-sm font-medium'>Min Price (Baht)</div>
        <Input
          placeholder='200.00'
          type='number'
          min='1'
          value={minPrice}
          onChange={handleMinPriceChange}
          onKeyDown={preventNegativeInput}
          className='[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <div className='text-sm font-medium'>Max Price (Baht)</div>
        <Input
          placeholder='1000.50'
          type='number'
          min='1'
          value={maxPrice}
          onChange={handleMaxPriceChange}
          onKeyDown={preventNegativeInput}
          className='[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
        />
      </div>
    </div>
  )
}
