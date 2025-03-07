import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'

import { EditPackageForm } from '@/components/photographer/package-page/edit-package'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { CreateQuotationProps } from './photographer-quotation'

interface QuotationProps {
  form: ReturnType<typeof useForm<CreateQuotationProps>>
  setSelectedPackage: (value: string) => void
  selectedPackage: string
  totalHours: number
  packages: EditPackageForm[]
}

export default function QuotationForm({
  form,
  setSelectedPackage,
  selectedPackage,
  totalHours,
  packages,
}: QuotationProps) {
  return (
    <div className='space-y-4'>
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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'justify-between pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <Icon
                        icon='uil:calender'
                        className='ml-auto h-4 w-4 opacity-50'
                      />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date('3024-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'justify-between pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <Icon
                        icon='uil:calender'
                        className='ml-auto h-4 w-4 opacity-50'
                      />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date('3024-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
    </div>
  )
}
