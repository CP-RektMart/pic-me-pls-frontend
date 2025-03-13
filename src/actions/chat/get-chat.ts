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
      },
      {
        id: '2',
        message: 'Hi 1',
        chatId: '1',
        sender: 'customer',
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
      },
      {
        id: '2',
        message: 'Hi 2',
        chatId: '2',
        sender: 'customer',
      },
    ],
  },
]

export function getChats(): Chat[] {
  return mockChats
}
