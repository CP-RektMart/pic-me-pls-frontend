import { mockChats } from './get-chat'

export function postChat(
  chatId: string,
  message: string,
  sender: 'photographer' | 'customer'
) {
  const chat = mockChats.find((chat) => chat.id === chatId)

  if (chat) {
    chat.conversation.push({
      id: String(chat.conversation.length + 1),
      message,
      chatId,
      sender,
    })
  }
}
