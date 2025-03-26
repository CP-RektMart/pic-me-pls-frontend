import { User } from '@/types/user'

export interface Chat {
  user: User
  messages: Message[]
}

export interface Message {
  id: number
  content: string
  senderId: number
  receiverId: number
  type?: 'TEXT' | 'QUOTATION'
  sendedAt?: string
}
