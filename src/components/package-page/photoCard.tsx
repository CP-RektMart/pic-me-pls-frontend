'use client'

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const photoCardSchema = z.object({
  description: z.string().min(2, 'Description must be at least 2 characters'),
})

type photoCardFormValues = z.infer<typeof photoCardSchema>

interface photoCardFormProps {
  description: string
  imageUrl: string
}

export default function PhotoCard({
  description,
  imageUrl,
}: photoCardFormProps) {
  const form = useForm<photoCardFormValues>({
    resolver: zodResolver(photoCardSchema),
    defaultValues: {
      description,
    },
  })

  return (
    <div className='w-full rounded-2xl bg-white shadow-sm'>
      <div className='relative aspect-[4/3] w-full'>
        <Image src={imageUrl} alt={'photo'} className='object-cover' fill />
      </div>

      <div className='w-full p-2.5'>
        <Form {...form}>
          <form id='package-form' className='flex min-h-16 flex-col gap-y-4'>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Description (Optional)'
                      disabled={false}
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
  )
}
