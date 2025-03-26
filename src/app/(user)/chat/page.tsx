import { getMessages } from '@/actions/chat/get-chat'
import { auth } from '@/auth'
import { type Chat } from '@/types/messages'
import { User } from '@/types/user'
import { notFound } from 'next/navigation'

import ChatPage from '@/components/chat/chat-page'

export default async function Chat() {
  const session = await auth()
  const messages = await getMessages()
  if (!session || !messages) {
    notFound()
  }

  return (
    <ChatPage
      accessToken={session.accessToken || ''}
      uesrId={session.user?.userId || 0}
      user={session.user as User}
      messages={messages as Chat[]}
    />
  )
}
