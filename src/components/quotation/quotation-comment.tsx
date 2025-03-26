import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/text-area'
import { QuotationStar } from './quotation-star'

export interface QuotationCommentProps {
  ratingScore: number
  handleCommentOnChange: (comment: string) => void
  handleStarOnChange: (ratingScore: number) => void
  handleSendOnClick: () => void
}

export function QuotationComment({
  ratingScore,
  handleCommentOnChange,
  handleStarOnChange,
  handleSendOnClick,
}: QuotationCommentProps) {
  return (
    <div className='space-y-2.5 p-4'>
      <div className='inline-flex items-center gap-x-4'>
        <Label className='text-base'>Rating</Label>
        <QuotationStar rating={ratingScore} onChange={handleStarOnChange} />
      </div>
      <div className='space-y-1.5'>
        <Label className='text-base'>Comment</Label>
        <Textarea
          placeholder='Type your message here.'
          className='h-20'
          onChange={(e) => handleCommentOnChange(e.target.value)}
        />
      </div>
      <div className='flex w-full justify-end'>
        <Button onClick={handleSendOnClick} className='text-center'>
          Send
        </Button>
      </div>
    </div>
  )
}
