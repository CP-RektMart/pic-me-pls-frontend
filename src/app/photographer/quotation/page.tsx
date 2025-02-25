import { Button } from '@/components/ui/button'

export default function QuotationPage() {
  return (
    <div className='flex w-full flex-row justify-between px-32 py-4'>
      <div className='text-2xl font-bold'>Quotation Manager</div>

      <Button>New Quotation</Button>
    </div>
  )
}
