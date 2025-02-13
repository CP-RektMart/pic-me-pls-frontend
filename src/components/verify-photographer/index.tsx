'use client'

import { useState } from 'react'

import verifyCitizenCardAction from '@/server/actions/verify-citizen-card'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { format } from 'date-fns'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
    .string()
    .length(13, 'Citizen ID must be exactly 13 digits')
    .regex(/^\d+$/, 'Citizen ID must contain only numbers'),
  expireDate: z.date({ required_error: 'Please select a date' }),
  laserId: z
    .string({ required_error: 'Enter your laser number' })
    .nonempty('Enter your laser number')
    .regex(
      /^[A-Z]{2}\d{10}$/,
      'Laser number must start with 2 capital letters followed by 10 digits'
    ),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
  cardPicture: z.instanceof(File),
})

type FormValues = z.infer<typeof formSchema>

interface ValidateProps {
  isReverify: boolean
  citizenId: string
  laserId: string
  picture: string
  expireDate: Date
}

export default function Page({
  isReverify,
  citizenId,
  laserId,
  picture,
  expireDate,
}: ValidateProps) {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      citizenId: citizenId,
      expireDate: expireDate,
      laserId: laserId,
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData()
      formData.append('citizenId', data.citizenId)
      formData.append('laserId', data.laserId)
      formData.append('expireDate', data.expireDate.toISOString())
      formData.append('cardPicture', data.cardPicture)

      await verifyCitizenCardAction(formData)

      toast.success('Your citizen card has been successfully verified')
    } catch {
      toast.error('An error occurred while verifying your citizen card')
    }
  }

  return (
    <div className='mx-auto min-h-screen max-w-7xl p-4 lg:px-8 lg:py-6'>
      {/* To be fixed: Move to layout */}
      <p className='mb-4 font-bold lg:text-2xl'>
        {!isReverify ? 'Verify your account' : 'Re-Verify your account'}
      </p>
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
            <FormField
              control={form.control}
              name='cardPicture'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      value={
                        form.getValues('cardPicture')
                          ? URL.createObjectURL(form.getValues('cardPicture'))
                          : picture
                      }
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='citizenId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>
                      Citizen ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='1-XXXX-XXXXX-XX-X'
                        maxLength={13}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-row justify-between gap-2'>
                <FormField
                  control={form.control}
                  name='expireDate'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel className='text-sm font-medium'>
                        Expire Date
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
                              className='w-full'
                            >
                              <p className='text-zinc-500'>
                                {field.value
                                  ? format(field.value, 'PP')
                                  : 'Select a date'}
                              </p>
                              <Icon
                                icon='lucide:calendar'
                                className='size-6 text-zinc-500'
                              />
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
                  )}
                />
                <FormField
                  control={form.control}
                  name='laserId'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel className='text-sm font-medium'>
                        Laser No.
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='MEx-xxxxxx-xx' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
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
