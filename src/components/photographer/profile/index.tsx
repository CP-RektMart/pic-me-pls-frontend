'use client'

import { useState } from 'react'

import updateProfileAction from '@/actions/profile/update-profile'
import { CitizenCard } from '@/types/photographer'
import { User } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import Link from 'next/link'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { SidebarProvider } from '@/components/photographer/common/sidebar-provider'
import { Button } from '@/components/ui/button'
import {
  Form,
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

const profileSchema = z.object({
  image: z.instanceof(File).optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^$|^0\d{2}-\d{3}-\d{4}$/, 'Invalid phone format'),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  bank: z.string().optional(),
  accountNo: z.string().optional(),
  bankBranch: z.string().optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

interface ProfileProps {
  profile: User
  citizenCard?: CitizenCard
}

export const Profile = (props: ProfileProps) => {
  const { profile, citizenCard } = props

  const isPhotographerVerified = !!citizenCard

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phoneNumber,
      facebook: profile.facebook,
      instagram: profile.instagram,
      bank: profile.bank,
      accountNo: profile.accountNo,
      bankBranch: profile.bankBranch,
    },
  })

  const setEditing = () => {
    if (form.getValues('phone') === '-') {
      form.setValue('phone', '')
    }
    if (form.getValues('facebook') === '-') {
      form.setValue('facebook', '')
    }
    if (form.getValues('instagram') === '-') {
      form.setValue('instagram', '')
    }
    setIsEditing(true)
  }

  const formatPhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<ProfileForm, 'phone'>
  ) => {
    // Remove non-numeric characters
    let rawValue = e.target.value.replace(/\D/g, '')

    if (rawValue.length > 10) {
      rawValue = rawValue.slice(0, 10)
    }

    // Formatting
    let formattedValue = rawValue
      .replace(/^(\d{3})(\d{0,3})/, '$1-$2')
      .replace(/^(\d{3}-\d{3})(\d{0,4})/, '$1-$2')
      .replace(/^(\d{3}-\d{3}-\d{4}).*/, '$1')

    const inputEvent = e.nativeEvent as InputEvent
    if (inputEvent.inputType === 'deleteContentBackward') {
      formattedValue = formattedValue.replace(/-$/, '')
    }

    field.onChange(formattedValue)
  }

  const onSubmit = async (data: ProfileForm) => {
    setIsSubmitting(true)

    try {
      await updateProfileAction(data)
      toast.success('Your profile has been successfully updated.')
    } catch {
      toast.error('An error occurred while updating your profile')
    }

    setIsSubmitting(false)
    setIsEditing(false)
  }

  return (
    <SidebarProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='flex justify-between gap-16'>
            <h1 className='text-2xl font-bold'>Profile</h1>
            {!isEditing ? (
              <Button key='edit-form' type='button' onClick={setEditing}>
                <Icon icon='lucide:square-pen' className='size-4 text-white' />
              </Button>
            ) : (
              <Button key='submit-form' type='submit' disabled={isSubmitting}>
                {isSubmitting ? (
                  <Icon
                    icon='lucide:loader-circle'
                    className='size-4 animate-spin'
                  />
                ) : (
                  <Icon icon='lucide:save' className='size-4 text-white' />
                )}
              </Button>
            )}
          </div>

          <div className='rounded-xl bg-white p-6'>
            <div className='flex flex-col gap-8 lg:flex-row'>
              <div className='flex flex-1 justify-center'>
                <FormField
                  control={form.control}
                  name='image'
                  defaultValue={undefined}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='flex flex-col items-center'>
                          <div className='relative my-8'>
                            <div className='relative size-56'>
                              <Image
                                alt='Profile Picture'
                                src={
                                  field.value
                                    ? URL.createObjectURL(field.value)
                                    : profile.profilePictureUrl || ''
                                }
                                fill
                                className='h-auto w-auto rounded-full object-cover shadow'
                              />
                            </div>
                            {isEditing && (
                              <label
                                htmlFor='profile-picture'
                                className='absolute bottom-2 right-2 z-10'
                              >
                                <div className='flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 shadow-md hover:bg-slate-200'>
                                  <Icon
                                    icon='lucide:edit'
                                    className='h-4 w-4 text-zinc-800'
                                  />
                                </div>
                              </label>
                            )}
                            <input
                              type='file'
                              id='profile-picture'
                              className='hidden'
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0])
                              }
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                            />
                          </div>
                          <div className='flex flex-col items-center justify-center space-y-4'>
                            <div>
                              {isPhotographerVerified ? (
                                <Link href='/photographer/reverify'>
                                  <Button type='button' variant='secondary'>
                                    Revalidate Citizen Card
                                  </Button>
                                </Link>
                              ) : (
                                <Link href='/photographer/verify'>
                                  <Button type='button' variant='secondary'>
                                    Verify Citizen Card
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex flex-1 flex-col gap-2'>
                <FormField
                  control={form.control}
                  name='name'
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='John Doe'
                          disabled={!isEditing}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='user@picmepls.com'
                          disabled
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='phone'
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={!isEditing}
                          maxLength={12}
                          value={field.value}
                          onChange={(event) => formatPhoneNumber(event, field)}
                          placeholder='xxx-xxx-xxxx'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='facebook'
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Facebook
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Facebook'
                          disabled={!isEditing}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='instagram'
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Instagram
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Instagram'
                          disabled={!isEditing}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex flex-1 flex-col gap-2'>
                  <hr className='mb-2 mt-4 border-t border-zinc-200' />
                  <h2 className='text-[24px] font-bold'>Payout Method</h2>

                  <FormField
                    control={form.control}
                    name='bank'
                    defaultValue=''
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          Bank
                        </FormLabel>
                        <Select
                          disabled={!isEditing}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select a bank' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='SCB'> SCB </SelectItem>
                            <SelectItem value='KBANK'>KBANK </SelectItem>
                            <SelectItem value='KTB'> KTB</SelectItem>
                            <SelectItem value='BBL'> BBL</SelectItem>
                            <SelectItem value='BAY'> BAY</SelectItem>
                            <SelectItem value='TTB'> TTB</SelectItem>
                            <SelectItem value='KKP'> KKP</SelectItem>
                          </SelectContent>
                          <FormMessage />
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='accountNo'
                    defaultValue=''
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          Bank Account Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='xxx-xxxxxx-x'
                            disabled={!isEditing}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='bankBranch'
                    defaultValue=''
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          Bank Branch
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Chulalongkorn University'
                            disabled={!isEditing}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </SidebarProvider>
  )
}
