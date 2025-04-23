'use client'

import { useState } from 'react'

import verifyCitizenCardAction from '@/actions/citizen-card/verify-citizen-card'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import PhotographerVerifyIcon from '@public/icons/photographer-verify.svg'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ControllerRenderProps, useForm } from 'react-hook-form'
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
  cardPicture: z
    .instanceof(File)
    .refine(
      (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
      'Card picture must be a .jpeg, .jpg, or .png file'
    )
    .refine(
      (file) => file.size <= 10 * 1000 * 1000,
      'File size must not exceed 10MB'
    ),
  citizenId: z
    .string()
    .min(17, 'Citizen ID must be in format 1-XXXX-XXXXX-XX-X')
    .max(17, 'Citizen ID must be in format 1-XXXX-XXXXX-XX-X')
    .regex(
      /^\d-\d{4}-\d{5}-\d{2}-\d$/,
      'Invalid Citizen ID format (1-XXXX-XXXXX-XX-X)'
    ),
  expireDate: z.date({ required_error: 'Please select a date' }),
  laserId: z
    .string({ required_error: 'Enter your laser number' })
    .nonempty('Enter your laser number')
    .regex(
      /^[A-Z]{2}\d{1}-\d{6}-\d{2}$/,
      'Laser number must be in format MEx-xxxxxx-xx'
    ),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function VerifyPhotographer() {
  const router = useRouter()
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      await verifyCitizenCardAction({
        citizenId: data.citizenId.replace(/-/g, ''),
        image: data.cardPicture,
        expireDate: data.expireDate,
        laserId: data.laserId.replace(/-/g, ''),
      })

      toast.success('Your citizen card has been successfully verified')
      router.push('/photographer')
    } catch {
      toast.error('An error occurred while verifying your citizen card')
    }
    setIsSubmitting(false)
  }

  const formatCitizenId = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormValues, 'citizenId'>
  ) => {
    // Remove non-numeric characters
    let rawValue = e.target.value.replace(/\D/g, '')

    if (rawValue.length > 13) {
      rawValue = rawValue.slice(0, 13)
    }

    // Formatting
    let formattedValue = rawValue
      .replace(/^(\d{1})(\d{0,4})/, '$1-$2')
      .replace(/^(\d{1}-\d{4})(\d{0,5})/, '$1-$2')
      .replace(/^(\d{1}-\d{4}-\d{5})(\d{0,2})/, '$1-$2')
      .replace(/^(\d{1}-\d{4}-\d{5}-\d{2})(\d{0,1})/, '$1-$2')

    const inputEvent = e.nativeEvent as InputEvent
    if (inputEvent.inputType === 'deleteContentBackward') {
      formattedValue = formattedValue.replace(/-$/, '')
    }

    field.onChange(formattedValue)
  }

  const formatLaserNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormValues, 'laserId'>
  ) => {
    let rawValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')

    if (rawValue.length > 12) {
      rawValue = rawValue.slice(0, 12)
    }

    // Formatting
    let formattedValue = rawValue
      .replace(/^([A-Z]{2}\d{1})([0-9]{0,6})/, '$1-$2')
      .replace(/^([A-Z]{2}\d{1}-\d{6})(\d{0,2})/, '$1-$2')
      .replace(/^([A-Z]{2}\d{1}-\d{6}-\d{2}).*/, '$1')

    const inputEvent = e.nativeEvent as InputEvent
    if (inputEvent.inputType === 'deleteContentBackward') {
      formattedValue = formattedValue.replace(/-$/, '')
    }

    field.onChange(formattedValue)
  }

  return (
    <div className='mx-auto min-h-screen max-w-7xl p-4 lg:px-8 lg:py-6'>
      <p className='mb-4 font-bold lg:text-2xl'>Verify your account</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-row justify-between gap-8'
        >
          <div className='hidden w-full items-center justify-center lg:flex'>
            <Image
              src={PhotographerVerifyIcon}
              alt='pic'
              width={380}
              height={200}
            />
          </div>
          <div className='flex w-full flex-col gap-8'>
            <FormField
              control={form.control}
              name='cardPicture'
              defaultValue={undefined}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      value={
                        form.getValues('cardPicture')
                          ? URL.createObjectURL(form.getValues('cardPicture'))
                          : undefined
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
                defaultValue=''
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>
                      Citizen ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='1-XXXX-XXXXX-XX-X'
                        maxLength={17}
                        value={field.value}
                        onChange={(event) => formatCitizenId(event, field)}
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
                  defaultValue={undefined}
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
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel className='text-sm font-medium'>
                        Laser No.
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='MEx-xxxxxx-xx'
                          {...field}
                          value={field.value}
                          onChange={(event) => formatLaserNumber(event, field)}
                        />
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
              defaultValue={undefined}
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
            <Button type='submit' className='self-end' disabled={isSubmitting}>
              {isSubmitting && (
                <Icon
                  icon='lucide:loader-circle'
                  className='size-4 animate-spin'
                />
              )}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
