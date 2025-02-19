'use client'

import { useState } from 'react'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import Container from '../container'

const gallerySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(2, 'Description must be at least 2 characters'),
  price: z.number().min(0, 'Price must be at least 0'),
  image: z
    .instanceof(File)
    .refine((file) => file.size !== 0, 'Please upload an image'),
})

type GalleryFormValues = z.infer<typeof gallerySchema>

interface GalleryDetailSectionProps {
  name: string
  description: string
  price: number
}

export default function GalleryDetailSection({
  name,
  description,
  price,
}: GalleryDetailSectionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>('')

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      name,
      description,
      price,
      image: new File([''], 'filename'),
    },
  })

  const onSubmit = async (data: GalleryFormValues) => {
    setIsEditing((prevState) => !prevState)

    if (!isEditing) {
      return
    }

    //mock data usage
    console.log(data)

    // const response = await updateGallery(data)

    // if (!response.result) {
    //   toast.error('An error occurred while updating your gallery')
    // } else {
    //   toast.success('Your gallery has been successfully updated.')
    // }
  }

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader()
      try {
        reader.onload = () => setPreview(reader.result)
        reader.readAsDataURL(acceptedFiles[0])
        form.setValue('image', acceptedFiles[0])
        form.clearErrors('image')
      } catch (error) {
        console.error(error)
        setPreview(null)
        form.resetField('image')
      }
    },
    [form]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    })

  return (
    <Container className='h-full'>
      <div className='flex h-full flex-col py-4'>
        <div className='flex h-full flex-col gap-y-4'>
          <h1 className='text-xl font-bold'>New Gallery</h1>
          <div className='h-full'>
            <Form {...form}>
              <form
                id='gallery-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex h-full flex-col gap-y-4'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Gallery Name'
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
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Description
                      </FormLabel>
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
                      <FormLabel className='text-sm font-medium'>
                        Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='$10'
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
                  name='image'
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <div
                          {...getRootProps()}
                          className='flex max-h-10 cursor-pointer flex-row items-center justify-center gap-x-2 rounded-lg border border-foreground bg-zinc-50 py-2 shadow-sm shadow-foreground'
                        >
                          {preview && (
                            <Image
                              src={preview as string}
                              alt='Uploaded image'
                              className='rounded-lg'
                              width={600} // Adjust width as needed
                              height={400} // Adjust height as needed
                              style={{ maxHeight: '400px', width: 'auto' }} // Ensure it respects max height
                            />
                          )}
                          <Image
                            src={'/uploadPhotoButton.svg'}
                            alt='icon'
                            width={24}
                            height={24}
                          />
                          <Input {...getInputProps()} type='file' />
                          {isDragActive ? (
                            <p className='text-sm'>Drop the image!</p>
                          ) : (
                            <p className='text-sm'>Upload Photos</p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage>
                        {fileRejections.length !== 0 && (
                          <p>
                            Image must be less than 1MB and of type png, jpg, or
                            jpeg
                          </p>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <div className=''>
                  <Link href='/gallery'>
                    <Button type='button' className='w-full hover:bg-zinc-700'>
                      Create
                    </Button>
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  )
}
