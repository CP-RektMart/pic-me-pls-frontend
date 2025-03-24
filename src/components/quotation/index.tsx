'use client'

import { useState } from 'react'

import { createPaymentUrl } from '@/actions/payment/create-payment-url'
import cancelQuotation from '@/actions/quotation/cancel-quotation'
import confirmQuotation from '@/actions/quotation/confirm-quotation'
import {
  type CustomerQuotationProps,
  type QuotationStatus,
} from '@/types/quotation'
import { toast } from 'sonner'

import { Container } from '@/components/container'
import { ProfileHeader } from '@/components/profile-header'
import { ImageCarousel } from '@/components/quotation/carousel'
import { QuotationButton } from '@/components/quotation/quotation-button'
import { QuotationDetails } from '@/components/quotation/quotation-details'

export default function Page({
  quotationId,
  quotationStatus,
  packageName,
  photographerName,
  customerName,
  from,
  to,
  description,
  duration,
  totalPrice,
  photographerImageUrl,
  packageNumber,
  quotationImages,
}: CustomerQuotationProps) {
  const [status, setStatus] = useState<QuotationStatus>(quotationStatus)

  const handlePayment = async () => {
    const url = await createPaymentUrl(quotationId)
    if (url) {
      window.location.href = url
    } else {
      toast.error('Failed to create payment URL')
    }
  }

  const handleCancel = async () => {
    await cancelQuotation(quotationId)
    toast.success('Quotation cancelled')
    setStatus('CANCELLED')
  }

  const handleConfirm = async () => {
    await confirmQuotation(quotationId)
    toast.success('Quotation confirmed')
    setStatus('CONFIRMED')
  }

  return (
    <Container className='py-4 lg:py-6'>
      <h1 className='mb-6 hidden text-2xl font-bold lg:block'>Quotation</h1>
      <div className='mx-auto flex flex-col justify-between gap-4 lg:flex-row lg:gap-6'>
        <div className='flex flex-1 flex-col gap-6'>
          <ProfileHeader
            imageUrl={photographerImageUrl}
            name={photographerName}
            packageNumber={packageNumber}
          />

          {/* package details */}
          <div className='hidden lg:block'>
            <h2 className='text-xl font-bold'>{packageName}</h2>
            <p className='mt-2 max-w-96 text-sm'>{description}</p>
            <ImageCarousel images={quotationImages} />
          </div>
        </div>

        <div className='flex-1'>
          <QuotationDetails
            quotationId={quotationId}
            quotationStatus={status as QuotationStatus}
            packageName={packageName}
            photographerName={photographerName}
            customerName={customerName}
            from={from}
            to={to}
            description={description}
            duration={duration}
            totalPrice={totalPrice}
          />
          <QuotationButton
            status={status}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            onPay={handlePayment}
          />
        </div>
      </div>
    </Container>
  )
}
