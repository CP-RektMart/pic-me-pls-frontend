import { useEffect, useMemo } from 'react'

import { Package } from '@/actions/photographer/package/get-packages'
import { CustomerPublic } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { ProfileThumbnail } from '@/components/package/profileThumbnail'
import { Button } from '@/components/ui/button'
import { DrawerTrigger } from '@/components/ui/drawer'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { DateTimePicker } from '../../ui/date-time-picker'
import { Textarea } from '../../ui/text-area'
import {
  CreateQuotationForm,
  createQuotationFormSchema,
} from './photographer-quotation'
import QuotationSummary from './quotation-summary'

interface QuotationProps {
  transactionType: string
  onSubmit: (data: CreateQuotationForm) => void
  packages: Package[]
  setSelectedPackageId: (value: string) => void
  selectedPackageId: string
  setIsOpen: (isOpen: boolean) => void
  fromDate?: Date
  toDate?: Date
  description?: string
  customerId?: number
  customerProfile?: CustomerPublic
}

export default function QuotationFormDrawer({
  transactionType,
  onSubmit,
  packages,
  setSelectedPackageId,
  selectedPackageId,
  setIsOpen,
  fromDate,
  toDate,
  description,
  customerId,
  customerProfile,
}: QuotationProps) {
  const form = useForm<CreateQuotationForm>({
    resolver: zodResolver(createQuotationFormSchema),
    defaultValues: {
      packageId: selectedPackageId,
      customerId: String(customerId) ?? '',
      from: fromDate,
      to: toDate,
      description: description,
      price: 0,
    },
  })

  const watchFrom = form.watch('from')
  const watchTo = form.watch('to')

  const totalHours = useMemo(() => {
    if (watchFrom && watchTo) {
      return Math.ceil(
        (new Date(watchTo).getTime() - new Date(watchFrom).getTime()) /
          (1000 * 60 * 60)
      )
    }
    return 0
  }, [watchFrom, watchTo])

  useEffect(() => {
    form.setValue('packageId', selectedPackageId)

    const selectedPackage = packages.find(
      (pkg) => String(pkg.id) === selectedPackageId
    )
    const calculatedPrice = totalHours * (selectedPackage?.price || 0)
    form.setValue('price', calculatedPrice)
  }, [totalHours, selectedPackageId, packages, form])

  return (
    <FormProvider {...form}>
      <div className='space-y-2 px-4 pb-4'>
        <hr className='my-4 border-[0.5px] border-zinc-400' />
        {customerProfile ? (
          <ProfileThumbnail
            haveVerifiedBadge={false}
            name={customerProfile?.name || ''}
            profilePictureUrl={customerProfile.profilePictureUrl || ''}
          />
        ) : (
          <div className='text-center text-xl text-gray-500'>
            No customer data available
          </div>
        )}

        <FormField
          control={form.control}
          name='packageId'
          defaultValue=''
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>Package</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    setSelectedPackageId(value)
                    field.onChange(value)
                  }}
                  value={field.value}
                >
                  <SelectTrigger className='w-full font-normal'>
                    <SelectValue placeholder='Select Package' />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map((pkg) => (
                      <SelectItem key={pkg.id} value={String(pkg.id)}>
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

        <div className='grid grid-cols-2 gap-2'>
          <FormField
            control={form.control}
            name='from'
            defaultValue={undefined}
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>From</FormLabel>
                <DateTimePicker value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='to'
            defaultValue={undefined}
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>To</FormLabel>
                <DateTimePicker value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='description'
          defaultValue=''
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Quotation Remarks' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <hr className='border-[0.5px] border-zinc-400' />

      <QuotationSummary
        packages={packages}
        totalHours={totalHours}
        selectedPackageId={selectedPackageId}
      />

      <div className='mt-auto'>
        <DrawerTrigger asChild>
          <Button
            type='button'
            className='w-full hover:bg-zinc-700'
            onClick={form.handleSubmit((data) => {
              onSubmit(data)
              form.reset()
              setIsOpen(false)
            })}
          >
            {transactionType === 'create' ? 'Create' : 'Save'}
          </Button>
        </DrawerTrigger>
      </div>
    </FormProvider>
  )
}
