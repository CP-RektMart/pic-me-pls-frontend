'use client'

import type React from 'react'
import { useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

interface QuotationStarProps {
  rating?: number
  maxRating?: number
  onChange?: (rating: number) => void
  readOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function QuotationStar({
  rating = 0,
  maxRating = 5,
  onChange,
  readOnly = false,
  size = 'md',
  className,
}: QuotationStarProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [currentRating, setCurrentRating] = useState<number>(rating)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (readOnly || !containerRef.current) return

    const { left, width } = containerRef.current.getBoundingClientRect()
    const position = ((event.clientX - left) / width) * maxRating
    const starIndex = Math.floor(position)
    const positionInStar = position - starIndex
    const newRating = positionInStar <= 0.5 ? starIndex + 0.5 : starIndex + 1
    const clampedRating = Math.max(0.5, Math.min(maxRating, newRating))

    setHoverRating(clampedRating)
  }

  const handleMouseLeave = () => {
    setHoverRating(null)
  }

  const handleClick = () => {
    if (readOnly || hoverRating === null) return

    setCurrentRating(hoverRating)
    onChange?.(hoverRating)
  }

  const displayRating = hoverRating !== null ? hoverRating : currentRating

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const starSize = sizeClasses[size]

  return (
    <div className={cn('flex items-center', className)}>
      <div
        ref={containerRef}
        className={cn(
          'flex cursor-pointer items-center gap-2',
          readOnly && 'cursor-default'
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {Array.from({ length: maxRating }).map((_, index) => {
          const starValue = index + 1
          const isActiveFull = displayRating >= starValue
          const isActiveHalf = displayRating === starValue - 0.5

          return (
            <button
              key={starValue}
              type='button'
              data-testid={`star-${starValue}`}
              onClick={() => {
                if (!readOnly) {
                  setCurrentRating(starValue)
                  onChange?.(starValue)
                }
              }}
              className='relative'
            >
              <Star
                className={cn(
                  starSize,
                  'text-[#dedceb]',
                  isActiveFull && 'text-yellow-400'
                )}
                fill={isActiveFull ? 'currentColor' : '#dedceb'}
              />
              {isActiveHalf && (
                <div className='absolute inset-0 w-1/2 overflow-hidden'>
                  <Star
                    className={cn(starSize, 'text-yellow-400')}
                    fill='currentColor'
                  />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
