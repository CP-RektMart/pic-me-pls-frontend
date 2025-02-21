'use client'

import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import GalleryDetailSection from '@/components/gallery-page/gallery-detail'
import PhotoCard from '@/components/gallery-page/photoCard'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const gallerySchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size !== 0, 'Please upload an image'),
})

type GalleryFormValues = z.infer<typeof gallerySchema>

export default function CreateGallery() {
  //mock gallery data
  const galleries = [...Array(8)]

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('')

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
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

  const onDrop = useCallback(
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
    <div className='flex w-full flex-col bg-gray-100 lg:flex-row'>
      <div className='shadow-right space-between h-full bg-white px-5 py-4 shadow-black/100 drop-shadow-lg lg:w-1/4'>
        {/* defaultValues */}
        <GalleryDetailSection
          name='Gallery'
          description='This is my gallery'
          price={10}
        />
      </div>
      <div className='lg:w-3/4'>
        {galleries.length === 0 ? (
          <div className='h-full'>
            <Form {...form}>
              <form
                id='gallery-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex h-full flex-col gap-y-4'
              >
                <FormField
                  control={form.control}
                  name='image'
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <div
                          {...getRootProps()}
                          className='flex h-auto min-h-96 cursor-pointer flex-col items-center justify-center gap-x-2 rounded-none bg-zinc-50 py-2 lg:h-screen'
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
                          <Icon
                            icon='mage:image-upload'
                            className='h-20 w-20'
                          />
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
        ) : (
          <div className='grid grid-cols-2 gap-4 p-4 lg:grid-cols-4'>
            {galleries.map((_, i) => (
              <div className='flex' key={i}>
                <PhotoCard
                  key={i}
                  description='My Gallery'
                  imageUrl='/mockPhotoCard.svg'
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
