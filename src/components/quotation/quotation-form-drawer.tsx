import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { EditPackageForm } from '@/components/photographer/package-page/edit-package'
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

interface QuotationProps {
  transactionType: string
  onSubmit: (data: {
    package: string
    customer: string
    from: Date
    to: Date
    description: string
  }) => void
  packages: EditPackageForm[]
  setSelectedPackage: (value: string) => void
  selectedPackage: string
}

export default function QuotationForm({
  transactionType,
  onSubmit,
  packages,
  setSelectedPackage,
  selectedPackage,
}: QuotationProps) {
  const form = useForm<CreateQuotationProps>({
    resolver: zodResolver(createQuotationFormSchema),
    defaultValues: {
      package: '',
      customer: '',
      description: '',
    },
  })

  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return new Date(`${month}/${day}/${year} ${hours}:${minutes}`)
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
    <FormProvider {...form}>
      <FormField
        control={form.control}
        name='package'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>Package</FormLabel>
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
            <FormLabel className='text-sm font-medium'>Customer Name</FormLabel>
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
            <FormItem className='flex flex-col'>
              <FormLabel>From</FormLabel>
              <DateTimePicker
                value={field.value}
                onChange={field.onChange}
                formatDate={formatDate}
              />
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
              <DateTimePicker
                value={field.value}
                onChange={field.onChange}
                formatDate={formatDate}
              />
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
              <Textarea
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
            {packages.find((pkg) => pkg.name === selectedPackage)?.price ?? 0}{' '}
            Baht
          </div>
        </div>

        <div className='flex flex-row justify-between'>
          <div className='text-sm font-normal'>Total Price</div>
          <div className='text-sm font-normal'>
            {((packages.find((pkg) => pkg.name === selectedPackage)?.price ??
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
            onClick={form.handleSubmit(onSubmit)}
          >
            {transactionType === 'create' ? 'Create' : 'Save'}
          </Button>
        </DrawerTrigger>
      </div>
    </FormProvider>
  )
}
