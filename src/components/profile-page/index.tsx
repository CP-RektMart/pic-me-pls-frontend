'use client'

import { useState } from 'react'

import updateProfileAction from '@/actions/update-profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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

import Container from '../container'
import { Badge } from '../ui/badge'

const profileSchema = z.object({
  image: z.any().refine((val) => val.length > 0, 'File is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^0\d{2}-\d{3}-\d{4}$/, 'Invalid phone format'),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  bank: z.string().optional(),
  accountNo: z.string().optional(),
  bankBranch: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileProps {
  isPhotographer: boolean
  isPhotographerVerified: boolean
  imageUrl: string
  name: string
  email: string
  phone: string
  facebook?: string
  instagram?: string
  bank?: string
  accountNo?: string
  bankBranch?: string
}

export default function Profile({
  isPhotographer,
  isPhotographerVerified,
  imageUrl,
  name,
  email,
  phone,
  facebook,
  instagram,
  bank,
  accountNo,
  bankBranch,
}: ProfileProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name,
      email: email,
      phone: phone,
      facebook: facebook,
      instagram: instagram,
      bank: bank,
      accountNo: accountNo,
      bankBranch: bankBranch,
    },
  })

  const onSubmit = async (data: ProfileFormValues) => {
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
    <Container className='my-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex justify-between gap-16'>
            <h1 className='text-2xl font-bold lg:text-3xl'>Edit Profile</h1>

            {!isEditing ? (
              <Button
                key='edit-form'
                type='button'
                onClick={() => setIsEditing(true)}
              >
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

          <div className='flex flex-col gap-8 lg:flex-row'>
            <div className='flex flex-1 justify-center'>
              <FormField
                control={form.control}
                name='image'
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
                                  : imageUrl
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
                          {isPhotographer ? (
                            <div className='flex gap-2'>
                              <Badge variant='photographer'>Photographer</Badge>
                              {isPhotographerVerified && (
                                <Badge
                                  variant='secondary'
                                  className='gap-1 bg-green-100 text-green-700'
                                >
                                  <Icon icon='lucide:verified' />
                                  Verified
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <Badge variant='customer'>Customer</Badge>
                          )}
                          <div>
                            {isPhotographer &&
                              (isPhotographerVerified ? (
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
                              ))}
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>Name</FormLabel>
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>Email</FormLabel>
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='xxx-xxx-xxxx'
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
                name='facebook'
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

              {isPhotographer && (
                <div className='flex flex-1 flex-col gap-2'>
                  <hr className='mb-2 mt-4 border-t border-zinc-200' />
                  <h2 className='text-[24px] font-bold'>Payout Method</h2>

                  <FormField
                    control={form.control}
                    name='bank'
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
              )}
            </div>
          </div>
        </form>
      </Form>
    </Container>
  )
}
