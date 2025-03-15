import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function ChatInputBar() {
  return (
    <div className='flex w-full items-center justify-between bg-slate-100 px-5 py-4'>
      <Input
        type='text'
        placeholder='Aa'
        className='w-full rounded-md border-none bg-white px-3 py-2'
      />
      <Button>Send</Button>
    </div>
  )
}
