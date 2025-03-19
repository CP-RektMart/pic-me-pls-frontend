import { Quotation } from '@/actions/quotation/get-quotations'

export interface Chat {
  id: string
  photographer: string
  customer: string
  conversation: Message[]
}

export interface BaseMessage {
  id: string
  chatId: string
  sender: 'photographer' | 'customer'
}

export interface TextMessage {
  type: 'text'
  message: string
}

export interface QuotationMessage {
  message: '[Quotation]'
  type: 'quotation'
  quotation: Quotation
  messageType: 'New Quotation' | 'Quotation Updated' | 'Quotation Cancelled'
}

export type Message = BaseMessage & (TextMessage | QuotationMessage)

const mockQuotation: Quotation = {
  quotationID: 1234,
  status: 'PENDING',
  packageName: 'South Side Package',
  packageId: 4321,
  photographerName: 'Aungpao',
  photographerId: 1112,
  customerName: 'Aung Aung',
  customerId: 1150,
  from: new Date(),
  to: new Date(new Date().setDate(new Date().getDate() + 1)),
  description: 'Sample quotation description',
  price: 500,
}

export const mockChats: Chat[] = [
  {
    id: '1',
    photographer: 'Photographer 1',
    customer: 'Customer 1',
    conversation: [
      {
        id: '1',
        message: 'Hello Chat 1',
        chatId: '1',
        sender: 'photographer',
        type: 'text',
      },
      {
        id: '2',
        message: 'Hi 1',
        chatId: '1',
        sender: 'customer',
        type: 'text',
      },
      {
        id: '3',
        message: 'How are you?',
        chatId: '1',
        sender: 'customer',
        type: 'text',
      },
      {
        id: '4',
        message: 'I am good',
        chatId: '1',
        sender: 'photographer',
        type: 'text',
      },
      {
        id: '5',
        message: 'How about you?',
        chatId: '1',
        sender: 'photographer',
        type: 'text',
      },
      {
        id: '6',
        message: 'I am good too',
        chatId: '1',
        sender: 'customer',
        type: 'text',
      },
      {
        id: '7',
        message: 'I have a question',
        chatId: '1',
        sender: 'customer',
        type: 'text',
      },
      {
        id: '8',
        message: 'What is it?',
        chatId: '1',
        sender: 'photographer',
        type: 'text',
      },
      {
        id: '9',
        message: 'Can you take a photo of me?',
        chatId: '1',
        sender: 'customer',
        type: 'text',
      },
      {
        id: '10',
        message: 'Sure',
        chatId: '1',
        sender: 'photographer',
        type: 'text',
      },
      {
        id: '11',
        message: 'When do you want to take the photo?',
        chatId: '1',
        sender: 'photographer',
        type: 'text',
      },
      {
        id: '12',
        message: 'How about tomorrow?',
        chatId: '1',
        sender: 'customer',
        type: 'text',
      },
      {
        id: '13',
        message: 'Sure',
        chatId: '1',
        sender: 'photographer',
        type: 'text',
      },
      {
        id: '14',
        message: 'What time?',
        chatId: '1',
        sender: 'photographer',
        type: 'text',
      },
      {
        id: '15',
        message: 'How about 3pm?',
        chatId: '1',
        sender: 'customer',
        type: 'text',
      },
      {
        id: '16',
        message: 'Sure',
        chatId: '1',
        sender: 'photographer',
        type: 'text',
      },
      {
        id: '17',
        message: 'Thank you',
        chatId: '1',
        sender: 'customer',
        type: 'text',
      },
      {
        id: '18',
        message: 'You are welcome',
        chatId: '1',
        sender: 'photographer',
        type: 'text',
      },
    ],
  },
  {
    id: '2',
    photographer: 'Photographer 2',
    customer: 'Customer 2',
    conversation: [
      {
        id: '1',
        message: 'Hello Chat 2',
        chatId: '2',
        sender: 'photographer',
        type: 'text',
      },
      {
        id: '2',
        message: 'Hi 2',
        chatId: '2',
        sender: 'customer',
        type: 'text',
      },
      {
        id: '3',
        message: '[Quotation]',
        chatId: '2',
        sender: 'photographer',
        type: 'quotation',
        quotation: mockQuotation,
        messageType: 'New Quotation',
      },
      {
        id: '4',
        message:
          "You can use Tailwind's max-w-3/4 utility along with break-words to ensure that if the text exceeds ¾ of the parent container's width, it wraps to a new line. However, Tailwind does not provide a max-w-3/4 directly, so you need to use max-w-[75%].",
        chatId: '2',
        sender: 'customer',
        type: 'text',
      },
      {
        id: '5',
        message:
          "You can use Tailwind's max-w-3/4 utility along with break-words to ensure that if the text exceeds ¾ of the parent container's width, it wraps to a new line. However, Tailwind does not provide a max-w-3/4 directly, so you need to use max-w-[75%].",
        chatId: '2',
        sender: 'photographer',
        type: 'text',
      },
    ],
  },
  {
    id: '3',
    photographer: 'Photographer 3',
    customer: 'Customer 3',
    conversation: [],
  },
]

export function getChats(): Chat[] {
  return mockChats
}
