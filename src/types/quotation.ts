export type QuotationStatus = 'PENDING' | 'CONFIRMED' | 'PAID' | 'CANCELLED'

export interface QuotationDetailsProps {
  quotationId: number
  quotationStatus: QuotationStatus
  packageName: string
  photographerName: string
  customerName: string
  from: string
  to: string
  description: string
  duration: string
  totalPrice: number
}

export interface CustomerQuotationProps extends QuotationDetailsProps {
  photographerImageUrl: string
  packageNumber: number
  quotationImages: { url: string; name: string }[]
}

export type WindowState = 'create' | 'edit' | null
