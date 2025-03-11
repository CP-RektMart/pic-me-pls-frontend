import { useMemo } from 'react'

import { Package } from '@/actions/get-packages'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { DrawerTrigger } from '@/components/ui/drawer'
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

import { DateTimePicker } from '../ui/date-time-picker'
import { Textarea } from '../ui/text-area'
import {
  CreateQuotationProps,
  createQuotationFormSchema,
} from './photographer-quotation'
import QuotationSummary from './quotation-summary'

interface QuotationProps {
  transactionType: string
  onSubmit: (data: {
    packageId: string
    customerId: string
    from: Date
    to: Date
    description: string
    price: number
  }) => void
  packages: Package[]
  setSelectedPackageId: (value: string) => void
  selectedPackageId: string
  setIsOpen: (isOpen: boolean) => void
}

export default function QuotationFormDrawer({
  transactionType,
  onSubmit,
  packages,
  setSelectedPackageId,
  selectedPackageId,
  setIsOpen,
}: QuotationProps) {
  const form = useForm<CreateQuotationProps>({
    resolver: zodResolver(createQuotationFormSchema),
    defaultValues: {
      packageId: '',
      customerId: '',
      description: '',
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

  return (
    <FormProvider {...form}>
      <div className='space-y-2 px-4 pb-4'>
        <FormField
          control={form.control}
          name='packageId'
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
                    <SelectValue placeholder='Package' />
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

        <FormField
          control={form.control}
          name='customerId'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>Customer Id</FormLabel>
              <FormControl>
                <Input placeholder='Customer Id' {...field} />
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
            onClick={() => {
              form.handleSubmit(onSubmit)
              form.reset()
              setIsOpen(false)
            }}
          >
            {transactionType === 'create' ? 'Create' : 'Save'}
          </Button>
        </DrawerTrigger>
      </div>
    </FormProvider>
  )
}
