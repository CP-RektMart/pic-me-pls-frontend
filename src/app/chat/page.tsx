import ViewChats from '@/components/chat/view-chats'

export default function ChatPage() {
  const isPhotographer = true

  return (
    <div className='w-full'>
      <ViewChats isPhotographer={isPhotographer} />
    </div>
  )
}
