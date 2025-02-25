'use client'

import { quotation } from '@/app/photographer/quotation/page'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { FormProvider, useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface PhotographerQuotationProps {
  quotations: quotation[]
}

interface CreateQuotationProps {
  package: string
  customer: string
  from: string
  to: string
  description: string
}

const createQuotationFormSchema = z.object({
  package: z.string().min(2, 'Gallery must be at least 2 characters'),
  customer: z.string().min(2, 'Customer must be at least 2 characters'),
  from: z.string().min(2, 'From must be at least 2 characters'),
  to: z.string().min(2, 'To must be at least 2 characters'),
  description: z.string().min(2, 'Description must be at least 2 characters'),
})

const isCreating = false

export default function PhotographerQuotation({
  quotations,
}: PhotographerQuotationProps) {
  const form = useForm<CreateQuotationProps>({
    resolver: zodResolver(createQuotationFormSchema),
    defaultValues: {
      package: '',
      customer: '',
      from: '',
      to: '',
      description: '',
    },
  })

  const onSubmit = async (data: CreateQuotationProps) => {
    console.log(data)
  }

  return (
    <div className='size-full'>
      {quotations.length == 0 ? (
        <div className='flex h-full flex-col items-center justify-center gap-3'>
          <Icon icon='lucide:sticky-note' className='size-20' />
          No Quotations To Show
        </div>
      ) : (
        <div className='grid h-full grid-cols-1 gap-6 lg:grid-cols-2'>
          <div className='gap-2.5 text-2xl font-bold lg:px-10'>
            Latest Quotations
          </div>
          {isCreating ? (
            <div className='space-y-4 text-2xl font-bold lg:px-10'>
              Create Quotation
              <FormProvider {...form}>
                <FormField
                  control={form.control}
                  name='package'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Package
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Package Name'
                          {...field}
                          className='font-normal'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='customer'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Customer Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Customer Name'
                          {...field}
                          className='font-normal'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-2 gap-2'>
                  <FormField
                    control={form.control}
                    name='customer'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          From
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Start Time'
                            {...field}
                            className='font-normal'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='customer'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          To
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='End Time'
                            {...field}
                            className='font-normal'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='customer'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Quotation Remarks'
                          {...field}
                          className='font-normal'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='mt-auto'>
                  <Button
                    type='button'
                    className='w-full hover:bg-zinc-700'
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Create
                  </Button>
                </div>
              </FormProvider>
              <hr className='border border-zinc-400' />
              <div className='flex flex-col gap-2 p-4'>
                <div className='flex flex-row justify-between'>
                  <div className='text-sm font-normal'>Total hours</div>
                  <div className='text-sm font-normal'>
                    {(
                      (new Date(quotations[0].to).getTime() -
                        new Date(quotations[0].from).getTime()) /
                      (1000 * 60 * 60)
                    ).toString()}{' '}
                    Hours
                  </div>
                </div>

                <div className='flex flex-row justify-between'>
                  <div className='text-sm font-normal'>Price Per Hour</div>
                  <div className='text-sm font-normal'>
                    {quotations[0].pricePerHour} Baht
                  </div>
                </div>

                <div className='flex flex-row justify-between'>
                  <div className='text-sm font-normal'>Total Price</div>
                  <div className='text-sm font-normal'>
                    {quotations[0].pricePerHour *
                      ((new Date(quotations[0].to).getTime() -
                        new Date(quotations[0].from).getTime()) /
                        (1000 * 60 * 60))}{' '}
                    Baht
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-4 space-y-4 text-2xl font-bold lg:px-10'>
              <div className='text-center'>{quotations[0].quotationID}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
