import { components } from '@/api/schema'
import { Review } from '@/types/package'

export type QuotationStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PAID'
  | 'CANCELLED'
  | 'SUBMITTED'
  | 'COMPLETED'
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
  isPhotographerVerified: boolean
  packageNumber: number
  quotationImages: { url: string; name: string }[]
  paymentStatus: string
  review?: Review
}

export type WindowState = 'create' | 'edit' | null

export type PreviewList =
  components['schemas']['dto.GetQuotationResponse']['previews']
