'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { PackageForm, PhotoCardForm } from './create-package'

interface packageDetailSectionProps {
  name: string
  description: string
  price: number
  photoCards: PhotoCardForm[]
  onSubmit: (data: PackageForm) => Promise<void>
  isEditing: boolean
  form: ReturnType<typeof useForm<PackageForm>>
  onDrop: (acceptedFiles: File[]) => void
}

export default function PackageDetailSection({
  onSubmit,
  isEditing,
  form,
  onDrop,
}: packageDetailSectionProps) {
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 10000000,
      accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    })

  return (
    <div className='shadow-right space-between flex flex-col gap-y-4 bg-white px-5 py-4 shadow-black/100 drop-shadow-lg lg:h-full lg:w-1/4'>
      <div className='flex flex-row items-center gap-4'>
        <Link href='/package'>
          <div className='rounded-full p-2 hover:bg-gray-200'>
            <Icon icon='ep:arrow-left-bold' />
          </div>
        </Link>
        <h1 className='text-xl font-bold'>New Package</h1>
      </div>
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>Name</FormLabel>
            <FormControl>
              <Input
                placeholder='Package Name'
                disabled={!isEditing}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='packageDescription'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>Description</FormLabel>
            <FormControl>
              <Input
                placeholder='Description'
                disabled={!isEditing}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='price'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>Price</FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder='$10'
                disabled={!isEditing}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <div
          {...getRootProps()}
          className='flex max-h-10 cursor-pointer flex-row items-center justify-center gap-x-2 rounded-lg bg-zinc-50 py-2'
        >
          <Icon icon='mage:image-upload' />
          <Input {...getInputProps()} type='file' />
          {isDragActive ? (
            <p className='text-sm'>Drop the image!</p>
          ) : (
            <p className='text-sm'>Upload Photos</p>
          )}
        </div>
        {fileRejections.length !== 0 && (
          <p>Image must be less than 10MB and of type png, jpg, or jpeg</p>
        )}
      </div>
      <div className='mt-auto'>
        <Link href='/package'>
          <Button
            type='button'
            className='w-full hover:bg-zinc-700'
            onClick={form.handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </Link>
      </div>
    </div>
  )
}

/* 
Source for upload photo button:
https://github.com/shadcn-ui/ui/discussions/3188
*/
