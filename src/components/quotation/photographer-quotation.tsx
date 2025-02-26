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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { PackageForm } from '../package-page/create-package'

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

const packages: PackageForm[] = [
  {
    name: 'Wedding Package',
    packageDescription: 'Wedding photography package',
    price: 400,
  },
  {
    name: 'Birthday Package',
    packageDescription: 'Birthday photography package',
    price: 300,
  },
  {
    name: 'Graduation Package',
    packageDescription: 'Graduation photography package',
    price: 200,
  },
]

const isCreating = true

export default function PhotographerQuotation({
  quotations,
}: PhotographerQuotationProps) {
  let statusColour

  switch (quotations[0].status) {
    case 'Pending':
      statusColour = 'text-amber-700'
      break
    case 'Confirmed':
      statusColour = 'text-sky-700'
      break
    case 'Paid':
      statusColour = 'text-emerald-700'
      break
    default:
      statusColour = 'text-red-700'
  }

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
      {quotations.length == 0 && !isCreating ? (
        <div className='flex h-full flex-col items-center justify-center gap-3'>
          <Icon icon='lucide:sticky-note' className='size-20' />
          No Quotations To Show
        </div>
      ) : (
        <div className='grid h-full grid-cols-1 gap-6 lg:grid-cols-2'>
          <div className='gap-2.5 text-2xl font-bold lg:px-10'>
            Latest Quotations
            {quotations.length == 0 ? (
              <div className='flex h-full flex-col items-center justify-center gap-3'>
                <Icon icon='lucide:sticky-note' className='size-20' />
                No Quotations To Show
              </div>
            ) : null}
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
                      <FormControl className='font-normal'>
                        <Select>
                          <SelectTrigger className='w-full font-normal'>
                            <SelectValue placeholder='Package' {...field} />
                          </SelectTrigger>
                          <SelectContent>
                            {packages.map((pkg) => (
                              <SelectItem
                                key={pkg.name}
                                value={pkg.name}
                                className='font-normal'
                              >
                                {pkg.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                    name='from'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          From
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='datetime-local'
                            placeholder='Start Time'
                            {...field}
                            className='font-normal'
                            step={1800}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='to'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          To
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='datetime-local'
                            placeholder='End Time'
                            {...field}
                            className='font-normal'
                            step={1800}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                      (new Date(form.getValues('to')).getTime() -
                        new Date(form.getValues('from')).getTime()) /
                        (1000 * 60 * 60) || ''
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

              <div className='flex flex-col gap-4 py-6'>
                <div className='flex flex-row justify-between text-sm font-normal'>
                  <div>Quotation ID</div>
                  <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
                    {quotations[0].quotationID}
                  </div>
                </div>

                <hr className='border border-gray-200' />

                <div className='flex flex-row justify-between text-sm font-normal'>
                  <div>Status</div>
                  <div
                    className={`max-h-24 max-w-48 overflow-hidden text-ellipsis text-right ${statusColour}`}
                  >
                    {quotations[0].status}
                  </div>
                </div>

                <hr className='border border-gray-200' />

                <div className='flex flex-row justify-between text-sm font-normal'>
                  <div>Package Name</div>
                  <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
                    {quotations[0].packageName}
                  </div>
                </div>

                <hr className='border border-gray-200' />

                <div className='flex flex-row justify-between text-sm font-normal'>
                  <div>Photographer Name</div>
                  <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
                    {quotations[0].photographerName}
                  </div>
                </div>

                <hr className='border border-gray-200' />

                <div className='flex flex-row justify-between text-sm font-normal'>
                  <div>Customer Name</div>
                  <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
                    {quotations[0].customerName}
                  </div>
                </div>

                <hr className='border border-gray-200' />

                <div className='flex flex-row justify-between text-sm font-normal'>
                  <div>From</div>
                  <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
                    {quotations[0].from.toLocaleString()}
                  </div>
                </div>

                <hr className='border border-gray-200' />

                <div className='flex flex-row justify-between text-sm font-normal'>
                  <div>To</div>
                  <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
                    {quotations[0].to.toLocaleString()}
                  </div>
                </div>

                <hr className='border border-gray-200' />

                <div className='flex flex-row justify-between text-sm font-normal'>
                  <div>Description</div>
                  <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
                    {quotations[0].description}
                  </div>
                </div>

                <hr className='border border-gray-200' />

                <div className='flex flex-row justify-between text-sm font-normal'>
                  <div>Duration</div>
                  <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
                    {(
                      (new Date(quotations[0].to).getTime() -
                        new Date(quotations[0].from).getTime()) /
                      (1000 * 60 * 60)
                    ).toString()}{' '}
                    Hours
                  </div>
                </div>

                <hr className='border border-gray-200' />

                <div className='flex flex-row justify-between text-sm font-normal'>
                  <div>Total Price</div>
                  <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
                    {quotations[0].pricePerHour *
                      ((new Date(quotations[0].to).getTime() -
                        new Date(quotations[0].from).getTime()) /
                        (1000 * 60 * 60))}{' '}
                    Baht
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
