'use client'

import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import PackageDetailSection from '@/components/package-page/package-detail'
import PhotoCard from '@/components/package-page/photoCard'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type packageFormValues = z.infer<typeof packageSchema>

const photoCardFormSchema = z.object({
  description: z.string(),
  imageUrl: z.string(),
})

interface photoCardForm {
  description: string
  imageUrl: string
}

const packageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  packageDescription: z
    .string()
    .min(2, 'Description must be at least 2 characters'),
  price: z.number().min(0, 'Price must be at least 0'),
  images: z.array(photoCardFormSchema),
})

export default function CreatePackage() {
  const [isEditing, setIsEditing] = useState<boolean>(true)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('')
  //mock package data
  const [photoCards, setPhotoCards] = useState<photoCardForm[]>([])

  const form = useForm<packageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: '',
      packageDescription: '',
      price: 0,
      images: [],
    },
  })

  const onSubmit = async (data: packageFormValues) => {
    setIsEditing((prevState) => !prevState)

    if (!isEditing) {
      return
    }

    //mock data usage
    console.log(data)

    // const response = await updatepackage(data)

    // if (!response.result) {
    //   toast.error('An error occurred while updating your package')
    // } else {
    //   toast.success('Your package has been successfully updated.')
    // }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader()
      try {
        reader.onload = () => setPreview(reader.result)
        reader.readAsDataURL(acceptedFiles[0])
        form.clearErrors('images')
        setPhotoCards([
          ...photoCards,
          { description: '', imageUrl: URL.createObjectURL(acceptedFiles[0]) },
        ])
      } catch (error) {
        console.error(error)
        setPreview(null)
        form.resetField('images')
      }
    },
    [form, photoCards]
  )

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
          isEditing={isEditing}
          form={form}
          onDrop={onDrop}
        />
        <div className='flex-1 lg:w-3/4'>
          {photoCards.length === 0 ? (
            <FormField
              control={form.control}
              name='images'
              render={() => (
                <FormItem className='h-full'>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className='flex h-full cursor-pointer flex-col items-center justify-center gap-x-2 rounded-none bg-zinc-50'
                    >
                      {preview && (
                        <Image
                          src={preview as string}
                          alt='Uploaded image'
                          className='rounded-lg'
                          width={600}
                          height={400}
                          style={{ maxHeight: '400px', width: 'auto' }}
                        />
                      )}
                      <Icon icon='mage:image-upload' className='h-20 w-20' />
                      <Input {...getInputProps()} type='file' />
                      {isDragActive ? (
                        <p className='text-sm'>Drop the image!</p>
                      ) : (
                        <div className='text-center'>
                          <p className='text-xl font-bold'>
                            Ready to add something?
                          </p>
                          <p>Drag photos and videos here to get started.</p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage>
                    {fileRejections.length !== 0 && (
                      <p>
                        Image must be less than 10MB and of type png, jpg, or
                        jpeg
                      </p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
          ) : (
            <div className='grid grid-cols-2 gap-4 p-4 lg:grid-cols-4'>
              {photoCards.map((_, i) => (
                <div className='flex' key={i}>
                  <PhotoCard
                    key={i}
                    description=''
                    imageUrl='/mockPhotoCard.svg'
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
