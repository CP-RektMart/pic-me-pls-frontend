'use client'

import { useState } from 'react'

import {
  type CustomerQuotationProps,
  type QuotationStatus,
} from '@/types/quotation'

import Container from '@/components/container'
import QuotationButton from '@/components/customer-quotation/button'
import QuotationCarousel from '@/components/customer-quotation/carousel'
import QuotationDetails from '@/components/customer-quotation/details'
import ProfileHeader from '@/components/customer-quotation/profile-header'

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

  const handlePayment = () => {
    setStatus('Paid')
    // TODO: handle payment
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
            <QuotationCarousel images={quotationImages} />
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
            onCancel={() => {
              setStatus('Cancelled')
            }}
            onConfirm={() => {
              setStatus('Confirm')
            }}
            onPay={handlePayment}
          />
        </div>
      </div>
    </Container>
  )
}
