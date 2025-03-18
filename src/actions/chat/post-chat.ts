import { mockChats } from './get-chat'

interface PostChatProps {
  chatId: string
  message: string
  sender: 'photographer' | 'customer'
  type: 'text' | 'quotation'
}

export function postChat({ chatId, message, sender, type }: PostChatProps) {
  const chat = mockChats.find((chat) => chat.id === chatId)

  // when it's a quotation, the message should be prefixed with '[Quotation]'
  if (type === 'quotation') {
    message = '[Quotation]'
  }

  if (chat) {
    chat.conversation.push({
      id: String(chat.conversation.length + 1),
      message,
      chatId,
      sender,
      type,
    })
  }
}
