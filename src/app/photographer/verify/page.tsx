'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import ImageUpload from '@/components/ui/imageUpload'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const formSchema = z.object({
  citizenId: z
    .string({ required_error: 'Enter your citizen id' })
    .nonempty('Citizen ID is required')
    .min(13, 'Citizen ID must be 13 characters')
    .max(13, 'Citizen ID must be 13 characters'),
  expiredDate: z.date({ required_error: 'Please select a date' }),
  laserNo: z
    .string({ required_error: 'Enter your laser number' })
    .nonempty('Laser No. is required'),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
})

export default function Page() {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      citizenId: '',
      expiredDate: undefined,
      laserNo: '',
      terms: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className='min-h-screen p-4'>
      {/* To be fixed: Move to layout */}
      <p className='mb-4 font-bold lg:text-2xl'>Verify your account</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-row justify-between gap-8'
        >
          <div className='hidden w-full items-center justify-center lg:flex'>
            <Image
              src={'/photographer-verify.svg'}
              alt='pic'
              width={380}
              height={200}
            />
          </div>
          <div className='flex w-full flex-col gap-8'>
            <ImageUpload />
            <div className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='citizenId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base font-medium'>
                      Citizen ID
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='1-XXXX-XXXXX-XX-X' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-row justify-between gap-2'>
                <FormField
                  control={form.control}
                  name='expiredDate'
                  render={({ field }) => (
                    <div className='flex-1'>
                      <FormItem className='flex flex-col'>
                        <FormLabel className='space-y-1.5 text-base font-medium'>
                          Expired Date
                        </FormLabel>
                        <FormControl>
                          <Popover
                            open={openCalendar}
                            onOpenChange={setOpenCalendar}
                          >
                            <PopoverTrigger
                              className='flex flex-row justify-between'
                              asChild
                            >
                              <Button
                                variant='outline'
                                onClick={() => setOpenCalendar(true)}
                              >
                                <p className='text-zinc-500'>
                                  {field.value
                                    ? format(field.value, 'PPP')
                                    : 'Select date'}
                                </p>
                                <CalendarIcon size={16} color='#71717A' />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className='ml-2 w-auto p-0'>
                              <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date)
                                  setOpenCalendar(false)
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name='laserNo'
                  render={({ field }) => (
                    <div className='flex-1'>
                      <FormItem>
                        <FormLabel className='text-base font-medium'>
                          Laser No.
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='MEx-xxxxxx-xx' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name='terms'
              render={({ field }) => (
                <FormItem>
                  <div className='flex space-x-2'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        id='terms'
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor='terms' className='text-sm font-medium'>
                        Accept terms and conditions
                      </Label>
                      <p className='text-sm text-zinc-500'>
                        You agree to our Terms of Service and Privacy Policy.
                      </p>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <Button type='submit' className='self-end'>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
