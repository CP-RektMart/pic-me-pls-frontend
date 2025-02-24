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

import {
  MAX_FILES,
  MAX_FILE_SIZE,
  PackageForm,
  PhotoCardForm,
} from './create-package'

interface packageDetailSectionProps {
  name: string
  description: string
  price: number
  photoCards: PhotoCardForm[]
  onSubmit: (data: PackageForm) => Promise<void>
  form: ReturnType<typeof useForm<PackageForm>>
  onDrop: (acceptedFiles: File[]) => void
}

export default function PackageDetailSection({
  onSubmit,
  form,
  onDrop,
}: packageDetailSectionProps) {
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: MAX_FILES,
      maxSize: MAX_FILE_SIZE,
      accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    })

  return (
    <div className='shadow-right space-between flex w-full flex-col gap-y-4 bg-white px-5 py-4 shadow-black/100 drop-shadow-lg lg:h-full lg:w-96'>
      <div className='flex flex-row items-center gap-4'>
        <Link href='/photographer/packages'>
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
              <Input placeholder='Package Name' {...field} />
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
              <Input placeholder='Description' {...field} />
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
            <FormLabel className='text-sm font-medium'>
              Price Per Hour
            </FormLabel>
            <FormControl>
              <Input type='number' placeholder='&#3647; 200' {...field} />
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
          <p>Image must be less than 10 MB and of type png, jpg, or jpeg</p>
        )}
      </div>
      <div className='mt-auto'>
        <Button
          type='button'
          className='w-full hover:bg-zinc-700'
          onClick={form.handleSubmit(onSubmit)}
        >
          Create
        </Button>
      </div>
    </div>
  )
}
