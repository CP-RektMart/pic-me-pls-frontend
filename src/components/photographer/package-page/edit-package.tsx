'use client'

import { useCallback, useState } from 'react'

import { MAX_FILES, MAX_FILE_SIZE } from '@/config/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDropzone } from 'react-dropzone'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import EditPackageDetailSection from '@/components/photographer/package-page/edit-package-detail'
import PhotoCard from '@/components/photographer/package-page/photoCard'
import { Input } from '@/components/ui/input'

export type EditPhotoCardForm = {
  description: string
  image: File
}

export const editpackageFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  packageDescription: z
    .string()
    .min(2, 'Description must be at least 2 characters'),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, 'Price must be a positive number'),
  category: z.string(),
})

export type EditPackageForm = z.infer<typeof editpackageFormSchema>

export const categories = [
  {
    id: '1',
    name: 'Weeding',
  },
  {
    id: '2',
    name: 'Birthday',
  },
  {
    id: '3',
    name: 'Anniversary',
  },
  {
    id: '4',
    name: 'Corporate',
  },
  {
    id: '5',
    name: 'Graduation',
  },
  {
    id: '6',
    name: 'Family',
  },
]

export default function EditPackage() {
  const [photoCards, setPhotoCards] = useState<EditPhotoCardForm[]>([])

  const handleDescriptionChange = (index: number, description: string) => {
    setPhotoCards((prev) =>
      prev.map((photo, i) => (i === index ? { ...photo, description } : photo))
    )
  }

  const handleDeletePhotoCard = (index: number) => {
    setPhotoCards((prev) => prev.filter((_, i) => i !== index))
  }

  const form = useForm<EditPackageForm>({
    resolver: zodResolver(editpackageFormSchema),
    defaultValues: {
      name: '',
      packageDescription: '',
      price: 0,
      category: '',
    },
  })

  const onSubmit = async (data: EditPackageForm) => {
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
      maxFiles: MAX_FILES,
      maxSize: MAX_FILE_SIZE,
      accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    })

  return (
    <FormProvider {...form}>
      <div className='flex w-full flex-col bg-gray-100 lg:flex-row'>
        <EditPackageDetailSection
          categories={categories}
          name=''
          description=''
          price={0}
          photoCards={photoCards}
          onSubmit={onSubmit}
          form={form}
          onDrop={onDrop}
        />
        <div className='flex-1'>
          {photoCards.length === 0 ? (
            <div className='h-full'>
              <div
                {...getRootProps()}
                className='flex h-full cursor-pointer flex-col items-center justify-center gap-x-2 gap-y-4 rounded-none bg-zinc-50'
              >
                <Icon icon='lucide:image-up' className='size-20' />
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
                  Image must be less than 10 MB and of type png, jpg, or jpeg
                </p>
              )}
            </div>
          ) : (
            <div>
              <div className='grid h-full grid-cols-2 gap-4 p-4 lg:grid-cols-4'>
                {photoCards.map((photo, i) => (
                  <div className='flex' key={i}>
                    <PhotoCard
                      key={i}
                      description={photo.description || ''}
                      imageUrl={URL.createObjectURL(photo.image)}
                      handleDescriptionChange={handleDescriptionChange}
                      index={i}
                      handleDeletePhotoCard={handleDeletePhotoCard}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  )
}
