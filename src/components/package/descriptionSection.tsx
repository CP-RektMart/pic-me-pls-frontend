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
  return (
    <div className='col-span-1 lg:col-span-8'>
      <h2 className='text-xl font-bold'>Description</h2>
      <p className='mt-2 text-gray-600'>{description}</p>
      <ImageGrid media={media} />
    </div>
  )
}
