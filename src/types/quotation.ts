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
  duration: number
  totalPrice: number
}

export interface CustomerQuotationProps extends QuotationDetailsProps {
  photographerImageUrl: string
  galleriesNumber: number
  quotationImages: { url: string; name: string }[]
}

export type WindowState = 'create' | 'edit' | null
