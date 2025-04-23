'use client'

import { useState } from 'react'

import { Review } from '@/types/package'
import { RatingScore } from '@/types/rating'
import { Icon } from '@iconify/react'
import { z } from 'zod'

import { QuotationStar } from '@/components/quotation/quotation-star'
import ReviewRating from '@/components/reviews/review-rating'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/text-area'

export interface QuotationCommentProps {
  hasReview?: boolean
  comment: string
  ratingScore: number
  review?: Review
  handleCommentOnChange: (comment: string) => void
  handleCommentDeletion: (reviewId: number) => Promise<void>
  handleStarOnChange: (ratingScore: number) => void
  handleSendOnClick: () => void
  handleUpdateOnClick: (reviewId: number) => void
}

export function QuotationComment({
  comment,
  ratingScore,
  review,
  handleCommentOnChange,
  handleCommentDeletion,
  handleStarOnChange,
  handleUpdateOnClick,
  handleSendOnClick,
}: QuotationCommentProps) {
  const hasReview = review !== undefined
  const [onEdit, setOnEdit] = useState<boolean>(false || !hasReview)
  const [onSent, setOnSent] = useState<boolean>(false)
  const originalComment = useState(comment)[0]
  const originalRatingScore = useState(ratingScore)[0]
  const [validationError, setValidationError] = useState<string | null>(null)

  const formSchema = z.object({
    ratingScore: z.number().min(1, 'Rating is required'),
    comment: z.string().min(1, 'Comment is required'),
  })

  return (
    <div className='w-full space-y-2.5 p-4'>
      <div className='flex flex-row items-center justify-between'>
        <div className='inline-flex h-8 items-center gap-x-4'>
          <Label className='text-base'>Rating</Label>
          {onEdit ? (
            <QuotationStar
              rating={ratingScore}
              onChange={handleStarOnChange}
              readOnly={!onEdit}
            />
          ) : (
            <ReviewRating rating={review?.rating as RatingScore} />
          )}
        </div>
        {hasReview && !onEdit && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={'ghost'} size={'iconButton'}>
                <Icon icon='lucide:ellipsis-vertical' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-28'>
              <ul className='w-full'>
                <button
                  className='w-full rounded-md px-4 py-1 text-end text-sm hover:bg-accent'
                  onClick={() => setOnEdit(true)}
                >
                  Edit
                </button>
                {hasReview && review && (
                  <button
                    className='w-full rounded-md px-4 py-1 text-end text-sm font-semibold text-red-600 underline hover:bg-accent'
                    onClick={() => {
                      if (review.id) {
                        handleCommentDeletion(review.id)
                      }
                    }}
                  >
                    Delete
                  </button>
                )}
              </ul>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <div className='space-y-1.5'>
        <Label className='text-base'>Comment</Label>
        {onEdit ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const isValid = formSchema.safeParse({ ratingScore, comment })
              if (isValid.success) {
                handleSendOnClick()
                setOnEdit(false)
                setValidationError(null)
              } else {
                console.error(isValid.error.errors)
                setValidationError(
                  isValid.error.errors[0]?.message || 'Comment is required'
                )
              }
            }}
          >
            <Textarea
              placeholder='Type your message here.'
              className='h-20 cursor-default'
              value={comment}
              onChange={(e) => {
                handleCommentOnChange(e.target.value)
                setValidationError(null)
              }}
            />
            {validationError && (
              <p className='mt-1 text-sm text-red-500'>{validationError}</p>
            )}
          </form>
        ) : (
          originalComment && (
            <p className='h-20 rounded-lg bg-gray-100 px-3 py-2.5 text-sm'>
              {onSent ? comment : originalComment}
            </p>
          )
        )}
      </div>
      <div className='flex w-full justify-end gap-x-4'>
        {!review && (
          <Button
            onClick={() => {
              const isValid = formSchema.safeParse({ ratingScore, comment })
              if (isValid.success) {
                handleSendOnClick()
                setOnEdit(false)
                setValidationError(null)
              } else {
                setValidationError(
                  isValid.error.errors[0]?.message || 'Comment is required'
                )
              }
            }}
          >
            Send
          </Button>
        )}
        {review && onEdit && (
          <Button
            variant={'destructive'}
            onClick={() => {
              if (originalComment || originalComment === '') {
                handleCommentOnChange(originalComment)
              }
              handleStarOnChange(originalRatingScore)
              setOnEdit(false)
            }}
          >
            Cancel
          </Button>
        )}
        {review && onEdit && (
          <Button
            onClick={() => {
              const isValid = formSchema.safeParse({ ratingScore, comment })
              if (isValid.success && review.id) {
                handleUpdateOnClick(review.id)
                setOnEdit(false)
                setOnSent(true)
                setValidationError(null)
              } else {
                setValidationError(
                  isValid.error?.errors[0]?.message || 'Comment is required'
                )
              }
            }}
          >
            Update
          </Button>
        )}
      </div>
    </div>
  )
}
