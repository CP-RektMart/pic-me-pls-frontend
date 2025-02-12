'use client'

import { useState } from 'react'

import { useToast } from '@/hooks/use-toast'
import updateProfile from '@/server/actions/update-profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
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

const profileSchema = z.object({
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
  const { toast } = useToast()

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
    setIsEditing((prevState) => !prevState)

    if (!isEditing) {
      return
    }

    const response = await updateProfile(data)
    console.log(response)

    if (!response.result) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description:
          'There was a problem with internal server. Please try again later.',
      })
    } else {
      toast({
        title: 'Profile updated.',
        description: 'Your profile has been successfully updated.',
      })
    }
  }

  return (
    <Container className='my-6'>
      <div className='flex h-10 flex-row'>
        <h1 className='items-center self-center text-2xl font-bold lg:text-3xl'>
          Edit Profile
        </h1>
        <Button
          type='submit'
          form='profile-form'
          className='ml-auto flex items-center rounded-md border bg-zinc-800 px-4 py-2 hover:bg-zinc-700'
        >
          <Icon
            icon={`lucide:${isEditing ? 'save' : 'square-pen'}`}
            className='size-4 text-white'
          />
        </Button>
      </div>

      <Form {...form}>
        <form
          id='profile-form'
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-8 lg:flex-row'
        >
          <div className='flex flex-1 justify-center'>
            <div className='relative my-8 h-[200px] w-[200px]'>
              <Image
                alt=''
                src={'/image.png'}
                width={200}
                height={200}
                className='rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
              />
              <div className='absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 shadow-md hover:bg-slate-200'>
                <Icon icon='lucide:edit' className='h-4 w-4 text-zinc-800' />
              </div>
            </div>
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
                <h2 className='text-[24px] font-bold'>Payment Method</h2>

                <FormField
                  control={form.control}
                  name='bank'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Bank
                      </FormLabel>
                      <Select disabled={!isEditing} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a bank' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent id='bank-options'>
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

                <div className='mt-4'>
                  <Link href='/photographer/reverify'>
                    <Button type='button' className='hover:bg-zinc-700'>
                      Revalidate Account
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </form>
      </Form>
    </Container>
  )
}
