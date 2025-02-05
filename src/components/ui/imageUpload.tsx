'use client'

import { useCallback, useState } from 'react'

import { cn } from '@/lib/utils'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

import { Button } from '@/components/ui/button'

export default function ImageUpload() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    multiple: false,
  })

  const removeImage = () => {
    setUploadedImage(null)
  }

  return (
    <div className='mx-auto w-full max-w-md p-6'>
      <div
        {...getRootProps()}
        className={cn(
          'cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors',
          isDragActive
            ? 'border-gray-500 bg-gray-500/10'
            : 'border-gray-300 hover:border-gray-500',
          uploadedImage ? 'h-auto' : 'h-40'
        )}
      >
        <input {...getInputProps()} />
        {uploadedImage ? (
          <div className='relative'>
            <Image
              src={uploadedImage || '/placeholder.svg'}
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
                removeImage()
              }}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        ) : (
          <div className='flex h-full flex-col items-center justify-center gap-2'>
            <Upload className='mx-auto' size={24} color='#62748E' />
            <p className='text-sm font-medium text-slate-500'>
              Upload your citizen card
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
