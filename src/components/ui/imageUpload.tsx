'use client'

import { useCallback } from 'react'

import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

import { Button } from '@/components/ui/button'

type ImageUploadProps = {
  value?: string
  onChange: (value: string | null) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          onChange(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    multiple: false,
  })

  return (
    <div className='mx-auto w-full'>
      <div
        {...getRootProps()}
        className={cn(
          'cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors',
          isDragActive
            ? 'border-gray-500 bg-gray-500/10'
            : 'border-gray-300 hover:border-gray-500',
          value ? 'h-auto' : 'h-40'
        )}
      >
        <input {...getInputProps()} />
        {value ? (
          <div className='relative'>
            <Image
              src={value}
              alt='Uploaded image'
              width={250}
              height={250}
              className='mx-auto rounded-lg object-cover'
            />
            <Button
              variant='destructive'
              size='icon'
              className='absolute -right-2 -top-2 lg:-top-3 lg:right-5'
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onChange('')
              }}
            >
              <Icon icon='lucide:x' className='size-4' />
            </Button>
          </div>
        ) : (
          <div className='flex h-full flex-col items-center justify-center gap-4'>
            <Icon
              icon='lucide:upload'
              className='mx-auto size-6 text-slate-500'
            />
            <p className='text-sm font-medium text-slate-500'>
              Drag and drop or click here to upload your citizen card
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
