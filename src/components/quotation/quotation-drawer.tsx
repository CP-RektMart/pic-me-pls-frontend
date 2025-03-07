'use client'

// import { useState } from 'react'
import { quotation } from '@/app/photographer/quotation/page'
import { QuotationStatus } from '@/types/quotation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import QuotationDetails from '@/components/customer-quotation/details'
import { EditPackageForm } from '@/components/photographer/package-page/edit-package'
import { Button } from '@/components/ui/button'
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
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

import { createQuotationFormSchema } from './photographer-quotation'
import { CreateQuotationProps } from './photographer-quotation'

interface QuotationDrawerProps {
  isCreating: boolean
  setIsCreating: (isCreating: boolean) => void
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
  currentQuotation: quotation | null
  setCurrentQuotation: (currentQuotation: quotation | null) => void
  packages: EditPackageForm[]
  selectedPackage: string
  setSelectedPackage: (selectedPackage: string) => void
}

export function QuotationDrawer({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  currentQuotation,
  setCurrentQuotation,
  packages,
  selectedPackage,
  setSelectedPackage,
}: QuotationDrawerProps) {
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

  const onEditButtonClicked = () => {
    setIsEditing(true)
    setIsCreating(false)
  }

  const onSubmit = async (data: CreateQuotationProps) => {
    setIsCreating(false)
    setIsEditing(false)
    setCurrentQuotation(null)
    console.log(data)
  }

  const onSaveEditing = async (data: CreateQuotationProps) => {
    setIsCreating(false)
    setIsEditing(false)
    setCurrentQuotation(null)
    console.log(data)
  }

  const watchFrom = form.watch('from')
  const watchTo = form.watch('to')

  const totalHours =
    watchFrom && watchTo
      ? Math.ceil(
          (new Date(watchTo).getTime() - new Date(watchFrom).getTime()) /
            (1000 * 60 * 60)
        )
      : 0

  return (
    <div className='lg:hidden'>
      <DrawerContent className='p-6 lg:hidden'>
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
                      <Select
                        onValueChange={(value) => {
                          setSelectedPackage(value)
                          field.onChange(value)
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className='w-full font-normal'>
                          <SelectValue placeholder='Package' />
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
                      <FormLabel className='text-sm font-medium'>To</FormLabel>
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
                <DrawerTrigger asChild>
                  <Button
                    type='button'
                    className='w-full hover:bg-zinc-700'
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Create
                  </Button>
                </DrawerTrigger>
              </div>
            </FormProvider>
            <hr className='border border-zinc-400' />
            <div className='flex flex-col gap-2 p-4'>
              <div className='flex flex-row justify-between'>
                <div className='text-sm font-normal'>Total hours</div>
                <div className='text-sm font-normal'>
                  {totalHours > 0 ? totalHours.toFixed(0) : 0} Hours
                </div>
              </div>

              <div className='flex flex-row justify-between'>
                <div className='text-sm font-normal'>Price Per Hour</div>
                <div className='text-sm font-normal'>
                  {packages.find((pkg) => pkg.name === selectedPackage)
                    ?.price ?? 0}{' '}
                  Baht
                </div>
              </div>

              <div className='flex flex-row justify-between'>
                <div className='text-sm font-normal'>Total Price</div>
                <div className='text-sm font-normal'>
                  {((packages.find((pkg) => pkg.name === selectedPackage)
                    ?.price ??
                    0) ||
                    0) * totalHours}{' '}
                  Baht
                </div>
              </div>
            </div>
          </div>
        ) : currentQuotation != null ? (
          isEditing ? (
            <div className='space-y-4 text-2xl font-bold lg:px-10'>
              <div className='w-full text-center'>
                Editing : {currentQuotation.quotationID}
              </div>

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
                        <Select
                          onValueChange={(value) => {
                            setSelectedPackage(value)
                            field.onChange(value)
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className='w-full font-normal'>
                            <SelectValue placeholder='Package' />
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

                <hr className='border border-zinc-400' />
                <div className='flex flex-col gap-2 p-4'>
                  <div className='flex flex-row justify-between'>
                    <div className='text-sm font-normal'>Total hours</div>
                    <div className='text-sm font-normal'>
                      {totalHours > 0 ? totalHours.toFixed(0) : 0} Hours
                    </div>
                  </div>

                  <div className='flex flex-row justify-between'>
                    <div className='text-sm font-normal'>Price Per Hour</div>
                    <div className='text-sm font-normal'>
                      {packages.find((pkg) => pkg.name === selectedPackage)
                        ?.price ?? 0}{' '}
                      Baht
                    </div>
                  </div>

                  <div className='flex flex-row justify-between'>
                    <div className='text-sm font-normal'>Total Price</div>
                    <div className='text-sm font-normal'>
                      {((packages.find((pkg) => pkg.name === selectedPackage)
                        ?.price ??
                        0) ||
                        0) * totalHours}{' '}
                      Baht
                    </div>
                  </div>
                </div>

                <div className='mt-auto'>
                  <DrawerTrigger asChild>
                    <Button
                      type='button'
                      className='w-full hover:bg-zinc-700'
                      onClick={form.handleSubmit(onSaveEditing)}
                    >
                      Save
                    </Button>
                  </DrawerTrigger>
                </div>
              </FormProvider>
            </div>
          ) : (
            <div className='flex flex-col gap-4 space-y-4 text-2xl lg:px-10'>
              <div className='flex w-full flex-row justify-between font-bold'>
                {currentQuotation.quotationID}
                <Button onClick={onEditButtonClicked}>Edit</Button>
              </div>

              <QuotationDetails
                quotationId={Number(currentQuotation.quotationID)}
                quotationStatus={currentQuotation?.status as QuotationStatus}
                packageName={currentQuotation.packageName}
                photographerName={currentQuotation.photographerName}
                customerName={currentQuotation.customerName}
                from={currentQuotation.from.toISOString()}
                to={currentQuotation.to.toISOString()}
                description={currentQuotation.description}
                duration={
                  (new Date(currentQuotation.to).getTime() -
                    new Date(currentQuotation.from).getTime()) /
                  (1000 * 60 * 60)
                }
                totalPrice={
                  currentQuotation.pricePerHour *
                  ((new Date(currentQuotation.to).getTime() -
                    new Date(currentQuotation.from).getTime()) /
                    (1000 * 60 * 60))
                }
              />
            </div>
          )
        ) : null}
        <DrawerHeader className='lg:hidden'>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </div>
  )
}
