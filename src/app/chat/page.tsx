import { getChats } from '@/actions/chat/get-chat'

import ViewChats from '@/components/chat/view-chats'

export default function ChatPage() {
  const isPhotographer = true
  const chats = getChats()

  return (
    <div className='w-full'>
      <ViewChats isPhotographer={isPhotographer} chats={chats} />
    </div>
  )
}
