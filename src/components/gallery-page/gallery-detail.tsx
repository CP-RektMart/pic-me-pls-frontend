'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
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

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      name,
      description,
      price,
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
  return (
    <Container className='my-6'>
      <div className='px-5 py-4'>
        <div className='space-y-2'>
          <h1 className='text-xl font-bold'>New Gallery</h1>
          <div className='gap-4'>
            <Form {...form}>
              <form
                id='gallery-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-8 lg:flex-row'
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
              </form>
            </Form>

            <Form {...form}>
              <form
                id='gallery-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-8 lg:flex-row'
              >
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
              </form>
            </Form>

            <Form {...form}>
              <form
                id='gallery-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-8 lg:flex-row'
              >
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
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  )
}
