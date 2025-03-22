import { useState } from 'react'

import { Button } from '@/components/ui/button'

interface DescriptionSectionProps {
  description: string
}

export function DescriptionSection({ description }: DescriptionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded((prev) => !prev)
  }

  const truncatedDescription =
    description.length > 600 ? description.slice(0, 600) + '...' : description

  return (
    <>
      <h2 className='text-xl font-bold'>Description</h2>
      <p className='mt-2 text-gray-600'>
        {isExpanded ? description : truncatedDescription}
      </p>
      {description.length > 600 && (
        <Button onClick={handleToggle} className='mt-3 p-2 text-sm text-white'>
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </>
  )
}
