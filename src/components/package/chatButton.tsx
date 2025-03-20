import { Button } from '@/components/ui/button'

interface ChatButtonProps {
  label: string
}

export function ChatButton({ label }: ChatButtonProps) {
  return <Button className='w-full bg-black text-white'>{label}</Button>
}
