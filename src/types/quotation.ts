import { components } from '@/api/schema'

export type QuotationStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PAID'
  | 'CANCELLED'
  | 'SUBMITTED'
  | 'ACCEPTED'

export type Quotation = components['schemas']['dto.QuotationResponse']

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
  paymentStatus: string
}

export type WindowState = 'create' | 'edit' | null

export type PreviewList =
  components['schemas']['dto.GetQuotationResponse']['previews']
