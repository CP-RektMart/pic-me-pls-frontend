'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { formatDateToDate } from '@/lib/utils'
import { Icon } from '@iconify/react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface DateTimePickerProps {
  value: Date | null
  onChange: (date: Date) => void
}

export function DateTimePicker(props: DateTimePickerProps) {
  const { value, onChange } = props

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'w-full pl-3 text-left text-xs font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            {value ? (
              new Date(value).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            ) : (
              <span>DD/MM/YYYY HH:mm</span>
            )}
            <Icon icon='uil:calender' className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='lg:flex'>
          <Calendar
            mode='single'
            selected={value ? new Date(value) : undefined}
            onSelect={(day) => day && onChange(formatDateToDate(day))}
            initialFocus
          />
          <div className='flex flex-col divide-y lg:h-[300px] lg:flex-row lg:divide-x lg:divide-y-0'>
            <ScrollArea className='w-64 lg:w-auto'>
              <div className='flex p-2 lg:flex-col'>
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <Button
                    key={hour}
                    size='icon'
                    variant={
                      value && new Date(value).getHours() === hour
                        ? 'default'
                        : 'ghost'
                    }
                    className='aspect-square shrink-0 lg:w-full'
                    onClick={() => {
                      if (value) {
                        const newDate = new Date(value)
                        newDate.setHours(hour)
                        onChange(formatDateToDate(newDate))
                      }
                    }}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='lg:hidden' />
            </ScrollArea>
            <ScrollArea className='w-64 lg:w-auto'>
              <div className='flex p-2 lg:flex-col'>
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size='icon'
                    variant={
                      value && new Date(value).getMinutes() === minute
                        ? 'default'
                        : 'ghost'
                    }
                    className='aspect-square shrink-0 lg:w-full'
                    onClick={() => {
                      if (value) {
                        const newDate = new Date(value)
                        newDate.setHours(minute)
                        onChange(formatDateToDate(newDate))
                      }
                    }}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='lg:hidden' />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
