import { type ClassValue, clsx } from 'clsx'
import {
  format,
  formatDuration,
  intervalToDuration,
  parse,
  parseISO,
} from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateToDate(date: Date): Date {
  const formattedString = format(date, 'MM/dd/yyyy HH:mm')
  return parse(formattedString, 'MM/dd/yyyy HH:mm', new Date())
}

export function formatDateToString(date: Date): string {
  return format(date, 'dd/MM/yyyy HH:mm')
}

export function calculateDuration(fromDate: string, toDate: string): string {
  const from = parseISO(fromDate)
  const to = parseISO(toDate)

  const duration = intervalToDuration({ start: from, end: to })

  return formatDuration(duration, {
    format: ['days', 'hours', 'minutes'],
  })
}
