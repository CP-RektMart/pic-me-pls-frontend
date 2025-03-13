'use client'

import { useCallback, useState } from 'react'

import CreatePackageAction from '@/actions/photographer/package/create-package'
import { MAX_FILES, MAX_FILE_SIZE } from '@/config/index'
import { Category } from '@/types/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { PhotoCard } from '@/components/photographer/package-page/photoCard'
import { Input } from '@/components/ui/input'

import { CreatePackageDetailSection } from './create-package-detail'

export type PhotoCardForm = {
  description: string
  image: File
}

export const createpackageFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  packageDescription: z
    .string()
    .min(2, 'Description must be at least 2 characters'),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, 'Price must be a positive number'),
  category: z.string().refine((val) => val !== '', 'Category is required'),
})

export type CreatePackageForm = z.infer<typeof createpackageFormSchema>

export interface CreatePackageProps {
  categories: Category[]
}

export default function CreatePackage({ categories }: CreatePackageProps) {
  const [photoCards, setPhotoCards] = useState<PhotoCardForm[]>([])
  const router = useRouter()

  const handleDescriptionChange = (index: number, description: string) => {
    setPhotoCards((prev) =>
      prev.map((photo, i) => (i === index ? { ...photo, description } : photo))
    )
  }

  const handleDeletePhotoCard = (index: number) => {
    setPhotoCards((prev) => prev.filter((_, i) => i !== index))
  }

  const form = useForm<CreatePackageForm>({
    resolver: zodResolver(createpackageFormSchema),
    defaultValues: {
      name: '',
      packageDescription: '',
      price: 0,
      category: '',
    },
  })

  const onSubmit = async (data: CreatePackageForm) => {
    try {
      const photoList = photoCards.map((photo) => photo)
      const payload = {
        name: data.name,
        packageDescription: data.packageDescription,
        price: data.price,
        category: data.category,
        photoCards: photoList,
      }

      await CreatePackageAction(payload)
      toast.success('Your package has been successfully created')
      router.push('/photographer/packages')
    } catch (err) {
      toast.error(`An error occurred while creating your package${err}`)
    }
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
        <CreatePackageDetailSection
          name=''
          description=''
          price={0}
          photoCards={photoCards}
          onSubmit={onSubmit}
          form={form}
          onDrop={onDrop}
          categories={categories}
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
