import { getMessages } from '@/actions/chat/get-chat'
import { auth } from '@/auth'
import { Chat } from '@/types/messages'
import { User } from '@/types/user'
import { notFound } from 'next/navigation'

import ChatPage from '@/components/chat/chat-page'

export default async function page() {
  const session = await auth()
  const messages = await getMessages()
  if (!session || !messages) {
    notFound()
  }

  return (
    <ChatPage
      accessToken={session.accessToken || ''}
      user={session.user as User}
      userId={session.user?.userId || 0}
      messages={messages as Chat[]}
    />
  )
}
