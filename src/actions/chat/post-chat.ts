import { Quotation } from '../quotation/get-quotations'
import { mockChats } from './get-chat'

interface BasePostChatProps {
  chatId: string
  sender: 'photographer' | 'customer'
}

interface TextPostChatProps extends BasePostChatProps {
  message: string
  type: 'text'
  quotation?: null
}

interface QuotationPostChatProps extends BasePostChatProps {
  message: '[Quotation]'
  type: 'quotation'
  quotation: Quotation
}

export function postText({ chatId, message, sender, type }: TextPostChatProps) {
  const chat = mockChats.find((chat) => chat.id === chatId)

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

export function postQuotation({
  chatId,
  message,
  sender,
  type,
  quotation,
}: QuotationPostChatProps) {
  const chat = mockChats.find((chat) => chat.id === chatId)

  if (chat) {
    chat.conversation.push({
      id: String(chat.conversation.length + 1),
      message,
      chatId,
      sender,
      type,
      quotation,
    })
  }
}
