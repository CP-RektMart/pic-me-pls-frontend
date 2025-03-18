export interface Chat {
  id: string
  photographer: string
  customer: string
  conversation: TextMessage[]
}

export interface TextMessage {
  id: string
  message: string
  chatId: string
  sender: 'photographer' | 'customer'
  type: 'text' | 'quotation'
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
