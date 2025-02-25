'use client'

import { useState } from 'react'

import {
  type CustomerQuotationProps,
  type QuotationStatus,
} from '@/types/quotation'

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
  galleriesNumber,
  quotationImages,
}: CustomerQuotationProps) {
  const [status, setStatus] = useState<QuotationStatus>(quotationStatus)

  const handleCancel = () => {
    setStatus('Cancelled')
  }

  const handleConfirm = () => {
    setStatus('Confirm')
  }

  const handlePayment = () => {
    setStatus('Paid')
  }

  return (
    <div className='mx-auto p-4 lg:px-0'>
      <p className='mb-6 hidden text-2xl font-bold lg:block'>Quotation</p>
      <div className='mx-auto flex flex-col justify-between gap-4 lg:flex-row lg:gap-6'>
        <div className='flex flex-col gap-6'>
          <ProfileHeader
            imageUrl={photographerImageUrl}
            name={photographerName}
            galleriesNumber={galleriesNumber}
          />

          {/* package details */}
          <div className='hidden lg:block'>
            <p className='text-xl font-bold'>{packageName}</p>
            <p className='mt-2 max-w-96 text-sm'>{description}</p>
            <QuotationCarousel images={quotationImages} />
          </div>
        </div>

        <div>
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
    </div>
  )
}
