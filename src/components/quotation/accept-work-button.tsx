import { Button } from '@/components/ui/button'

export default function AcceptWorkButton({ onClick }: { onClick: () => void }) {
  return (
    <Button className='w-full' onClick={onClick}>
      Accept Work
    </Button>
  )
}
