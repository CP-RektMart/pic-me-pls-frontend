import { auth } from '@/auth'
import { notFound } from 'next/navigation'

import ChatPage from '@/components/chat/chat-page'

export default async function Chat() {
  const session = await auth()

  if (!session?.accessToken) {
    notFound()
  }

  return <ChatPage accessToken={session.accessToken} />
}
