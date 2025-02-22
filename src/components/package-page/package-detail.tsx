'use client'

import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
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

const packageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(2, 'Description must be at least 2 characters'),
  price: z.number().min(0, 'Price must be at least 0'),
  image: z
    .instanceof(File)
    .refine((file) => file.size !== 0, 'Please upload an image'),
})

type packageFormValues = z.infer<typeof packageSchema>

interface packageDetailSectionProps {
  name: string
  description: string
  price: number
  setPackage: React.Dispatch<React.SetStateAction<File[]>>
  packages: File[]
}

export default function PackageDetailSection({
  name,
  description,
  price,
  setPackage,
  packages,
}: packageDetailSectionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(true)

  const form = useForm<packageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name,
      description,
      price,
      image: new File([''], 'filename'),
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
        reader.readAsDataURL(acceptedFiles[0])
        form.setValue('image', acceptedFiles[0])
        form.clearErrors('image')
        setPackage([...packages, acceptedFiles[0]])
      } catch (error) {
        console.error(error)
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
    <div className='h-full'>
      <div className='flex flex-row items-center gap-x-4 gap-y-4'>
        <Link href='/package'>
          <div className='rounded-full p-2 hover:bg-gray-200'>
            <Icon icon='ep:arrow-left-bold' />
          </div>
        </Link>
        <h1 className='text-xl font-bold'>New package</h1>
      </div>
      <div className='h-full py-4'>
        <Form {...form}>
          <form
            id='package-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex h-full flex-col gap-y-4'
          >
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
                  <FormLabel className='text-sm font-medium'>Price</FormLabel>
                  <FormControl>
                    <Input placeholder='$10' disabled={!isEditing} {...field} />
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
            <div className='mb-4 mt-auto'>
              <Link href='/package'>
                <Button type='button' className='w-full hover:bg-zinc-700'>
                  Create
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

/* 
Source for upload photo button:
https://github.com/shadcn-ui/ui/discussions/3188
*/
