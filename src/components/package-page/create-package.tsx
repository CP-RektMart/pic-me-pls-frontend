'use client'

import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { useDropzone } from 'react-dropzone'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import PackageDetailSection from '@/components/package-page/package-detail'
import PhotoCard from '@/components/package-page/photoCard'
import { Input } from '@/components/ui/input'

export type PhotoCardForm = {
  description: string
  image: File
}

export const packageFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  packageDescription: z
    .string()
    .min(2, 'Description must be at least 2 characters'),
  price: z.string().refine((val) => !Number.isNaN(parseFloat(val))),
})

export type PackageForm = z.infer<typeof packageFormSchema>

export default function CreatePackage() {
  //mock package data
  const [photoCards, setPhotoCards] = useState<PhotoCardForm[]>([])

  const handleDescriptionChange = (index: number, description: string) => {
    setPhotoCards((prev) =>
      prev.map((photo, i) => (i === index ? { ...photo, description } : photo))
    )
  }

  const form = useForm<PackageForm>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      name: '',
      packageDescription: '',
      price: '',
    },
  })

  const onSubmit = async (data: PackageForm) => {
    //mock data usage
    console.log(data)
    console.log(photoCards)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setPhotoCards((prev) => [
      ...prev,
      ...acceptedFiles.map((file) => ({ description: '', image: file })),
    ])
  }, [])

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 10000000,
      accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    })

  return (
    <FormProvider {...form}>
      <div className='flex w-full flex-col bg-gray-100 lg:flex-row'>
        {/* defaultValues */}
        <PackageDetailSection
          name=''
          description=''
          price={0}
          photoCards={photoCards}
          onSubmit={onSubmit}
          form={form}
          onDrop={onDrop}
        />
        <div className='flex-1 lg:w-3/4'>
          {photoCards.length === 0 ? (
            <div className='h-full'>
              <div
                {...getRootProps()}
                className='flex h-full cursor-pointer flex-col items-center justify-center gap-x-2 rounded-none bg-zinc-50'
              >
                <Icon icon='mage:image-upload' className='h-20 w-20' />
                <Input {...getInputProps()} type='file' />
                {isDragActive ? (
                  <p className='text-sm'>Drop the image!</p>
                ) : (
                  <div className='text-center'>
                    <p className='text-xl font-bold'>Ready to add something?</p>
                    <p>Drag photos and videos here to get started.</p>
                  </div>
                )}
              </div>
              {fileRejections.length !== 0 && (
                <p>
                  Image must be less than 10MB and of type png, jpg, or jpeg
                </p>
              )}
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-4 p-4 lg:grid-cols-4'>
              {photoCards.map((photo, i) => (
                <div className='flex' key={i}>
                  <PhotoCard
                    key={i}
                    description=''
                    imageUrl={URL.createObjectURL(photo.image)}
                    handleDescriptionChange={handleDescriptionChange}
                    index={i}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  )
}
