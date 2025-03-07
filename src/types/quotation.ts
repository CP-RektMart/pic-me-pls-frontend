export type QuotationStatus = 'Pending' | 'Confirm' | 'Paid' | 'Cancelled' | ''

export interface QuotationDetailsProps {
  quotationId: number
  quotationStatus: QuotationStatus
  packageName: string
  photographerName: string
  customerName: string
  from: string
  to: string
  description: string
  duration: number
  totalPrice: number
}

export interface CustomerQuotationProps extends QuotationDetailsProps {
  photographerImageUrl: string
  galleriesNumber: number
  quotationImages: { url: string; name: string }[]
}
