'use client'

import { useState } from 'react'

import { quotation } from '@/app/photographer/quotation/page'
import { QuotationStatus } from '@/types/quotation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { FormProvider, useForm } from 'react-hook-form'
import z from 'zod'

import QuotationDetails from '@/components/customer-quotation/details'
import { EditPackageForm } from '@/components/photographer/package-page/edit-package'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
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

import { QuotationDrawer } from './quotation-drawer'

export interface PhotographerQuotationProps {
  quotations: quotation[]
  packages: EditPackageForm[]
}

export interface CreateQuotationProps {
  package: string
  customer: string
  from: string
  to: string
  description: string
}

export const createQuotationFormSchema = z.object({
  package: z.string().min(2, 'Gallery must be at least 2 characters'),
  customer: z.string().min(2, 'Customer must be at least 2 characters'),
  from: z.string().min(2, 'From must be at least 2 characters'),
  to: z.string().min(2, 'To must be at least 2 characters'),
  description: z.string().min(2, 'Description must be at least 2 characters'),
})

export default function PhotographerQuotation({
  quotations,
  packages,
}: PhotographerQuotationProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>('')

  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [currentQuotation, setCurrentQuotation] = useState<quotation | null>(
    null
  )

  // let statusColour: string

  // switch (currentQuotation?.status) {
  //   case 'Pending':
  //     statusColour = 'text-amber-700'
  //     break
  //   case 'Confirmed':
  //     statusColour = 'text-sky-700'
  //     break
  //   case 'Paid':
  //     statusColour = 'text-emerald-700'
  //     break
  //   default:
  //     statusColour = 'text-red-700'
  // }

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

  const onClose = () => {
    setIsCreating(false)
    setIsEditing(false)
    setCurrentQuotation(null)
  }

  const onCreateQuotationButtonClicked = () => {
    setIsCreating(true)
    setIsEditing(false)
  }

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
    <div className='size-full space-y-6'>
      <Drawer onOpenChange={(open) => !open && onClose?.()}>
        <div className='flex flex-row justify-between'>
          <div className='text-2xl font-bold'>Quotation Manager</div>

          <Button
            onClick={onCreateQuotationButtonClicked}
            className='hidden lg:block'
          >
            New Quotation
          </Button>
          <DrawerTrigger asChild>
            <Button
              onClick={onCreateQuotationButtonClicked}
              className='lg:hidden'
            >
              <Icon icon='lucide:plus' />
            </Button>
          </DrawerTrigger>
        </div>
        {quotations.length == 0 && !isCreating && !isEditing ? (
          <div className='flex h-full flex-col items-center justify-center gap-3'>
            <Icon icon='lucide:sticky-note' className='size-20' />
            No Quotations To Show
          </div>
        ) : (
          <div className='grid h-full grid-cols-1 gap-6 lg:grid-cols-2'>
            <div className='gap-2.5 space-y-2.5 text-2xl font-bold lg:px-10'>
              <div>Latest Quotations</div>

              {quotations.length == 0 ? (
                <div className='flex h-full flex-col items-center justify-center gap-3'>
                  <Icon icon='lucide:sticky-note' className='size-20' />
                  No Quotations To Show
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  {quotations.map((quotation) => (
                    //to be replaced with card component
                    <div key={quotation.quotationID}>
                      <DrawerTrigger asChild>
                        <Button
                          onClick={() => setCurrentQuotation(quotation)}
                          className='w-full lg:hidden'
                        >
                          {quotation.quotationID}
                        </Button>
                      </DrawerTrigger>
                      <Button
                        onClick={() => setCurrentQuotation(quotation)}
                        className='hidden w-full lg:block'
                      >
                        {quotation.quotationID}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* right side of lg, drawer in mobile */}
            <div className='hidden lg:block'>
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
                          <div className='text-sm font-normal'>
                            Price Per Hour
                          </div>
                          <div className='text-sm font-normal'>
                            {packages.find(
                              (pkg) => pkg.name === selectedPackage
                            )?.price ?? 0}{' '}
                            Baht
                          </div>
                        </div>

                        <div className='flex flex-row justify-between'>
                          <div className='text-sm font-normal'>Total Price</div>
                          <div className='text-sm font-normal'>
                            {((packages.find(
                              (pkg) => pkg.name === selectedPackage
                            )?.price ??
                              0) ||
                              0) * totalHours}{' '}
                            Baht
                          </div>
                        </div>
                      </div>

                      <div className='mt-auto'>
                        <Button
                          type='button'
                          className='w-full hover:bg-zinc-700'
                          onClick={form.handleSubmit(onSaveEditing)}
                        >
                          Save
                        </Button>
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
                      quotationStatus={
                        currentQuotation?.status as QuotationStatus
                      }
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
            </div>
            {/* end of lg case */}

            <QuotationDrawer
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              currentQuotation={currentQuotation}
              setCurrentQuotation={setCurrentQuotation}
              packages={packages}
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
            />
          </div>
        )}
      </Drawer>
    </div>
  )
}
