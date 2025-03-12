import { type QuotationStatus } from '@/types/quotation'

import { Button } from '@/components/ui/button'

export default function QuotationButton({
  status,
  onCancel,
  onConfirm,
  onPay,
}: {
  status: QuotationStatus
  onCancel: () => void
  onConfirm: () => void
  onPay: () => void
}) {
  return (
    <div className='mt-8 flex flex-row justify-between gap-2 px-4 lg:mt-4'>
      {status === 'PENDING' && (
        <>
          <Button variant='destructive' className='w-full' onClick={onCancel}>
            <p>Cancel</p>
          </Button>
          <Button className='w-full' onClick={onConfirm}>
            <p>Confirm</p>
          </Button>
        </>
      )}
      {status === 'CONFIRMED' && (
        <Button className='w-full' onClick={onPay}>
          <p>Pay</p>
        </Button>
      )}
    </div>
  )
}
