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

interface ImagePostChatProps extends BasePostChatProps {
  message: '[Image]'
  imageUrl: string
  type: 'image'
}

export function postTextMessage({
  chatId,
  message,
  sender,
  type,
}: TextPostChatProps) {
  if (message === '' || message === null) {
    return
  }

  // const chat = mockChats.find((chat) => chat.id === chatId)

  // if (chat) {
  //   chat.conversation.push({
  //     id: String(chat.conversation.length + 1),
  //     message,
  //     chatId,
  //     sender,
  //     type,
  //   })
  // }

  console.log(process.env.TEST)
  console.log('chatId', chatId)
  console.log('message', message)
  console.log('sender', sender)
  console.log('type', type)

  return
}

export function postQuotationMessage({
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
      messageType: 'New Quotation',
    })
  }
}

export function postImageMessage({
  chatId,
  message,
  imageUrl,
  sender,
  type,
}: ImagePostChatProps) {
  console.log('posting image message', chatId, message, sender, type)

  const chat = mockChats.find((chat) => chat.id === chatId)

  if (chat) {
    chat.conversation.push({
      id: String(chat.conversation.length + 1),
      message,
      imageUrl,
      chatId,
      sender,
      type,
    })
  }
}
