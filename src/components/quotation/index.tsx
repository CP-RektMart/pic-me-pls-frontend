'use client'

import { useEffect, useState } from 'react'

import { createPaymentUrl } from '@/actions/payment/create-payment-url'
import acceptQuotation from '@/actions/quotation/accept-quotation'
import cancelQuotation from '@/actions/quotation/cancel-quotation'
import confirmQuotation from '@/actions/quotation/confirm-quotation'
import { createReview } from '@/actions/review/create-review'
import { deleteReview } from '@/actions/review/delete-review'
import { updateReview } from '@/actions/review/update-review'
import {
  type CustomerQuotationProps,
  type QuotationStatus,
} from '@/types/quotation'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Container } from '@/components/container'
import { PreviewView } from '@/components/photographer/quotations/preview-view'
import { ProfileHeader } from '@/components/profile-header'
import AcceptWorkButton from '@/components/quotation/accept-work-button'
import { ImageCarousel } from '@/components/quotation/carousel'
import { QuotationButton } from '@/components/quotation/quotation-button'
import { QuotationComment } from '@/components/quotation/quotation-comment'
import { QuotationDetails } from '@/components/quotation/quotation-details'
import ReportButton from '@/components/report/report-btn'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

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
  paymentStatus,
  review,
}: CustomerQuotationProps) {
  const router = useRouter()
  const [status, setStatus] = useState<QuotationStatus>(quotationStatus)
  const [ratingScore, setRatingScore] = useState<number>(0.0)
  const [comment, setComment] = useState<string>(review?.comment ?? '')

  useEffect(() => {
    if (quotationStatus === 'ACCEPTED') {
      setStatus('COMPLETED')
    }
  }, [quotationStatus])

  useEffect(() => {
    if (!paymentStatus) return
    setTimeout(() => {
      if (paymentStatus === 'success') {
        toast.success('Payment successful')
      } else if (paymentStatus === 'cancel') {
        toast.error('Payment cancelled')
      }
    }, 100)
  }, [paymentStatus])

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

  const handleAcceptWork = async () => {
    await acceptQuotation(quotationId)
    setStatus('COMPLETED')
  }

  const handleCommentOnChange = (text: string) => {
    setComment(text)
  }

  const handleCommentSubmission = async () => {
    try {
      const payload = {
        quotationID: quotationId,
        rating: ratingScore,
        comment: comment,
      }
      toast.success('Review has been sent!')
      await createReview(payload)
    } catch {
      toast.error('Unknown errors occured. Failed to send reveiw.')
    }
  }

  const handleCommentUpdate = async (reviewId: number) => {
    try {
      const payload = {
        id: reviewId,
        quotationID: quotationId,
        rating: ratingScore,
        comment: comment,
      }
      toast.success('Review has been updated!')
      await updateReview(payload)
    } catch {
      toast.error('Unknown errors occured. Failed to update reveiw.')
    }
  }

  const handleCommentDeletion = async (reviewId: number) => {
    try {
      const payload = {
        id: reviewId,
        quotationID: quotationId,
      }
      toast.success('Review has been deleted!')
      await deleteReview(payload)
    } catch {
      toast.error('Unknown errors occured. Failed to delete reveiw.')
    }
  }

  return (
    <Container className='py-4 lg:py-6'>
      <div className='flex flex-row justify-end lg:justify-between'>
        <h1 className='mb-6 hidden text-2xl font-bold lg:block'>Quotation</h1>
        {(status === 'COMPLETED' ||
          status === 'PAID' ||
          status === 'CANCELLED') && (
          <span className='hidden lg:block'>
            <ReportButton quotationId={quotationId} />
          </span>
        )}
      </div>
      <div className='mx-auto flex flex-col justify-between gap-4 lg:flex-row lg:gap-6'>
        <div className='flex flex-1 flex-col gap-6'>
          <div className='flex flex-row items-center justify-between'>
            <ProfileHeader
              imageUrl={photographerImageUrl}
              name={photographerName}
              packageNumber={packageNumber}
            />
            {(status === 'COMPLETED' ||
              status === 'PAID' ||
              status === 'CANCELLED') && (
              <div className='lg:hidden'>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={'ghost'} size={'iconButton'}>
                      <Icon icon='lucide:ellipsis-vertical' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-28 p-0'>
                    <ReportButton
                      quotationId={quotationId}
                      variant={'outline'}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          {/* package details */}
          <div className='hidden lg:block'>
            <h2 className='text-xl font-bold'>{packageName}</h2>
            <p className='mt-2 max-w-96 text-sm'>{description}</p>
            <ImageCarousel images={quotationImages} />
          </div>
        </div>

        <div className='flex-1'>
          {/* Go Back Button */}
          <div className='mb-2 flex size-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-gray-200'>
            <Icon
              icon='lucide:chevron-left'
              className='text-xl'
              onClick={() => router.back()}
            />
          </div>

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
          {status === 'PAID' ||
            (status === 'SUBMITTED' && (
              <>
                <PreviewView quotationId={quotationId} isPhotographer={false} />
                <AcceptWorkButton onClick={handleAcceptWork} />
              </>
            ))}
          <QuotationButton
            status={status}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            onPay={handlePayment}
          />
          {(status === 'COMPLETED' || status === 'CANCELLED') && (
            <QuotationComment
              ratingScore={review?.rating ?? ratingScore}
              review={review}
              comment={comment}
              handleCommentOnChange={handleCommentOnChange}
              handleCommentDeletion={handleCommentDeletion}
              handleSendOnClick={handleCommentSubmission}
              handleUpdateOnClick={handleCommentUpdate}
              handleStarOnChange={setRatingScore}
            />
          )}
        </div>
      </div>
    </Container>
  )
}
