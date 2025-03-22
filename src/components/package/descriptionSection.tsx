import { useState } from 'react'

import { Media } from '@/types/package'

import { ImageGrid } from './imageGrid'

interface DescriptionSectionProps {
  description: string
  media: Media[]
}

export function DescriptionSection({
  description,
  media,
}: DescriptionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded((prev) => !prev)
  }

  const truncatedDescription =
    description.length > 600 ? description.slice(0, 600) + '...' : description

  return (
    <div className='col-span-1 lg:col-span-8'>
      <h2 className='text-xl font-bold'>Description</h2>
      <p className='mt-2 text-gray-600'>
        {isExpanded ? description : truncatedDescription}
      </p>
      {description.length > 600 && (
        <button
          onClick={handleToggle}
          className='mt-2 font-bold text-black hover:underline'
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
      <ImageGrid media={media} />
    </div>
  )
}
