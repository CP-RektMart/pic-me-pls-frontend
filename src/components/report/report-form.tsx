'use client'

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/text-area'

import { ReportForm } from './report-btn'

interface ReportFormProps {
  onSubmit: (data: ReportForm) => Promise<void>
  form: ReturnType<typeof useForm<ReportForm>>
}

export function ReportFormInput({ onSubmit, form }: ReportFormProps) {
  return (
    <div className='shadow-right flex w-full flex-col space-y-4 py-4'>
      <FormField
        control={form.control}
        name='title'
        defaultValue=''
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium text-zinc-400'>
              Title
            </FormLabel>
            <FormControl>
              <Input placeholder='Title' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='description'
        defaultValue=''
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium text-zinc-400'>
              Description
            </FormLabel>
            <FormControl>
              <Textarea
                className='min-h-28'
                placeholder='Description'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='ml-auto'>
        <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
      </div>
    </div>
  )
}
