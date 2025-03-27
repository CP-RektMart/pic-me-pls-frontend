'use client'

import { useState } from 'react'

import { Review } from '@/types/package'
import { Icon } from '@iconify/react'

import { QuotationStar } from '@/components/quotation/quotation-star'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/text-area'

export interface QuotationCommentProps {
  ratingScore: number
  review?: Review
  comment?: string
  handleCommentOnChange: (comment: string) => void
  handleCommentDeletion: (reviewId: number) => Promise<void>
  handleStarOnChange: (ratingScore: number) => void
  handleSendOnClick: () => void
  handleUpdateOnClick: (reviewId: number) => void
}

export function QuotationComment({
  ratingScore,
  review,
  comment,
  handleCommentOnChange,
  handleCommentDeletion,
  handleStarOnChange,
  handleUpdateOnClick,
  handleSendOnClick,
}: QuotationCommentProps) {
  const hasReview = review !== undefined
  console.log({ comment, hasReview })
  const [onEdit, setOnEdit] = useState<boolean>(false || !hasReview)
  const originalComment = useState(comment)[0]

  return (
    <div className='w-full space-y-2.5 p-4'>
      <div className='flex flex-row items-center justify-between'>
        <div className='inline-flex h-8 items-center gap-x-4'>
          <Label className='text-base'>Rating</Label>
          <QuotationStar
            rating={ratingScore}
            onChange={handleStarOnChange}
            readOnly={!onEdit}
          />
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
                {hasReview && (
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
          <Textarea
            placeholder='Type your message here.'
            className='h-20 cursor-default'
            value={comment}
            disabled={!onEdit}
            onChange={(e) => handleCommentOnChange(e.target.value)}
          />
        ) : (
          originalComment && (
            <p className='h-20 rounded-lg bg-gray-100 px-3 py-2.5 text-sm'>
              {originalComment}
            </p>
          )
        )}
      </div>
      <div className='flex w-full justify-end gap-x-4'>
        {!review && (
          <Button
            onClick={() => {
              handleSendOnClick()
              setOnEdit(false)
            }}
          >
            Send
          </Button>
        )}
        {review && onEdit && (
          <Button
            variant={'destructive'}
            onClick={() => {
              setOnEdit(false)
              if (originalComment || originalComment === '') {
                handleCommentOnChange(originalComment)
              }
            }}
          >
            Cancel
          </Button>
        )}
        {review && onEdit && (
          <Button
            onClick={() => {
              if (review.id) {
                handleUpdateOnClick(review.id)
              }
              setOnEdit(false)
            }}
          >
            Update
          </Button>
        )}
      </div>
    </div>
  )
}
