'use client'

import { useState } from 'react'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { ImagePlus } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
    <Container className='my-6'>
      <div className='px-5 py-4'>
        <div className='flex flex-col gap-y-4'>
          <h1 className='text-xl font-bold'>New Gallery</h1>
          <div>
            <Form {...form}>
              <form
                id='gallery-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-y-4'
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
                    <FormItem className='mx-auto md:w-1/2'>
                      <FormLabel
                        className={`${
                          fileRejections.length !== 0 && 'text-destructive'
                        }`}
                      >
                        <h2 className='text-xl font-semibold tracking-tight'>
                          Upload your image
                          <span
                            className={
                              form.formState.errors.image ||
                              fileRejections.length !== 0
                                ? 'text-destructive'
                                : 'text-muted-foreground'
                            }
                          ></span>
                        </h2>
                      </FormLabel>
                      <FormControl>
                        <div
                          {...getRootProps()}
                          className='mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground'
                        >
                          {preview && (
                            <img
                              src={preview as string}
                              alt='Uploaded image'
                              className='max-h-[400px] rounded-lg'
                            />
                          )}
                          <ImagePlus
                            className={`size-40 ${preview ? 'hidden' : 'block'}`}
                          />
                          <Input {...getInputProps()} type='file' />
                          {isDragActive ? (
                            <p>Drop the image!</p>
                          ) : (
                            <p>Click here or drag an image to upload it</p>
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
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  )
}
