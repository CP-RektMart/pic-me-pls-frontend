'use client'

import React from 'react'

import Image from 'next/image'

import { Input } from '@/components/ui/input'

interface photoCardFormProps {
  description: string
  imageUrl: string
  handleDescriptionChange: (index: number, description: string) => void
  index: number
}

export default function PhotoCard({
  description,
  imageUrl,
  handleDescriptionChange,
  index,
}: photoCardFormProps) {
  return (
    <div className='w-full rounded-2xl bg-white shadow-sm'>
      <div className='relative aspect-[4/3] w-full'>
        <Image src={imageUrl} alt={'photo'} className='object-cover' fill />
      </div>

      <div className='w-full p-2.5'>
        <Input
          placeholder='Description (Optional)'
          onChange={(e) => {
            handleDescriptionChange(index, e.target.value)
          }}
          defaultValue={description}
        />
      </div>
    </div>
  )
}
