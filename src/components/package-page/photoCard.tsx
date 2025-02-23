'use client'

import React from 'react'

import { Icon } from '@iconify/react'
import Image from 'next/image'

import { Input } from '@/components/ui/input'

import { Button } from '../ui/button'

interface photoCardFormProps {
  description: string
  imageUrl: string
  handleDescriptionChange: (index: number, description: string) => void
  index: number
  handleDeletePhotoCard: (index: number) => void
}

export default function PhotoCard({
  description,
  imageUrl,
  handleDescriptionChange,
  index,
  handleDeletePhotoCard,
}: photoCardFormProps) {
  return (
    <div className='w-full overflow-hidden rounded-2xl bg-white shadow-sm'>
      <div className='relative aspect-[4/3] w-full bg-zinc-800'>
        <Button
          className='absolute right-2.5 top-2.5 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/80 hover:bg-black/30'
          onClick={() => handleDeletePhotoCard(index)}
        >
          <Icon icon='lucide:x' className='size-4 text-white' />
        </Button>

        <Image src={imageUrl} alt={'photo'} className='object-contain' fill />
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
