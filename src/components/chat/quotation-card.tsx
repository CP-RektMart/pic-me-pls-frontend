import { Quotation } from '@/actions/quotation/get-quotations'

interface QuotationMessageProps {
  quotation: Quotation
}

export default function QuotationMessage({ quotation }: QuotationMessageProps) {
  return <div className='h-64 w-72'>{quotation.quotationID}</div>
}
