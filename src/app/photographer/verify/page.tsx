'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import ImageUpload from '@/components/ui/imageUpload'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Inputs = {
  citizenId: string
  expiredDate: Date
  laserNo: string
  terms: boolean
}

export default function Page() {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { expiredDate: undefined } })

  const submitDate = (date?: Date) => {
    if (date) {
      setValue('expiredDate', date)
      setOpenCalendar(false)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div className='min-h-screen p-4'>
      {/* To be fixed: Move to layout */}
      <p className='mb-4 font-bold lg:text-2xl'>Verify your account</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
            <div className='space-y-1.5'>
              <p className='font-medium'>Citizen ID</p>
              <Input
                placeholder='1-XXXX-XXXXX-XX-X'
                {...register('citizenId', { required: true })}
                className={cn(
                  errors.citizenId &&
                    'border-red-400 focus-visible:ring-red-600'
                )}
              />
              {errors.citizenId && (
                <span className='text-sm text-red-400'>
                  Please enter your Citizen ID
                </span>
              )}
            </div>
            <div className='flex flex-row justify-between gap-2'>
              <div className='flex-1 space-y-1.5'>
                <p className='font-medium'>Expired Date</p>
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className={cn(
                        'flex w-full justify-between',
                        errors.expiredDate &&
                          'border-red-400 focus-visible:ring-red-600'
                      )}
                      onClick={() => setOpenCalendar(true)}
                    >
                      <p className='text-zinc-500'>
                        {watch('expiredDate')
                          ? format(watch('expiredDate'), 'PPP')
                          : 'Select date'}
                      </p>
                      <CalendarIcon size={16} color='#71717A' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='ml-2 w-auto p-0'>
                    <Calendar
                      mode='single'
                      onSelect={submitDate}
                      {...register('expiredDate', { required: true })}
                    />
                  </PopoverContent>
                </Popover>
                {errors.expiredDate && (
                  <span className='text-sm text-red-400'>
                    Please select an expired date
                  </span>
                )}
              </div>
              <div className='flex-1 space-y-1.5'>
                <p className='font-medium'>Laser No.</p>
                <Input
                  placeholder='MEx-xxxxxx-xx'
                  {...register('laserNo', { required: true })}
                  className={cn(
                    errors.laserNo &&
                      'border-red-400 focus-visible:ring-red-600'
                  )}
                />
                {errors.laserNo && (
                  <span className='text-sm text-red-400'>
                    Please enter your laser number
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className='flex space-x-2'>
              <Checkbox
                id='terms'
                {...register('terms')}
                checked={watch('terms')}
                onCheckedChange={(checked: boolean) =>
                  setValue('terms', checked)
                }
              />
              <div className='flex flex-col space-y-1.5 leading-none'>
                <Label
                  htmlFor='terms'
                  className='mt-0.5 text-sm font-medium leading-none'
                >
                  Accept terms and conditions
                </Label>
                <p className='text-sm text-zinc-500'>
                  You agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
          <Button type='submit' className='self-end'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
