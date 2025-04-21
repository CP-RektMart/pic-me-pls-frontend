import { Message } from '@/types/messages'
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

export function calculateDurationFromString(
  fromDate: string,
  toDate: string
): string {
  const from = parseISO(fromDate)
  const to = parseISO(toDate)

  const duration = intervalToDuration({ start: from, end: to })

  return formatDuration(duration, {
    format: ['days', 'hours', 'minutes'],
  })
}

export function calculateDurationFromDate(
  fromDate: Date,
  toDate: Date
): string {
  const duration = intervalToDuration({ start: fromDate, end: toDate })

  return formatDuration(duration, {
    format: ['days', 'hours', 'minutes'],
  })
}

export const splitFirstSpace = (text: string): string[] => {
  const parts = text.split(' ')
  if (parts.length < 2) return parts // No space found
  return [parts[0] as string, parts.slice(1).join(' ')]
}

export const convertMessage = (raw: string): Message | null => {
  const [event, message] = splitFirstSpace(raw)
  if (event == 'MESSAGE' && !!message) {
    return JSON.parse(message)
  } else {
    console.error('message error', message)
  }
  return null
}

export const phoneNumberFormatter = (phoneNumber: string): string => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`
  }
  return phoneNumber
}
