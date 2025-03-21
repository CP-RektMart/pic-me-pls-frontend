import { useState } from 'react'

import { Media } from '@/types/package'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../ui/button'

export function ImageGrid({ media }: { media: Media[] }) {
  const imagesPerPage = 6
  const totalPages = Math.ceil(media.length / imagesPerPage)

  const [currentPage, setCurrentPage] = useState(0)

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const startIndex = currentPage * imagesPerPage
  const currentMedia = media.slice(startIndex, startIndex + imagesPerPage)

  const paddedMedia = [
    ...currentMedia,
    ...Array(imagesPerPage - currentMedia.length).fill(null),
  ]

  return (
    <div>
      <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {paddedMedia.map((mediaItem, index) =>
          mediaItem ? (
            <ImageWithLoading
              key={index}
              src={mediaItem.pictureUrl || '/default.jpg'}
              alt={`Image ${index + 1}`}
            />
          ) : (
            <div
              key={index}
              className='relative h-[180px] w-full bg-transparent'
            ></div>
          )
        )}
      </div>

      {totalPages > 1 && (
        <div className='mt-4 flex items-center justify-between'>
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className='rounded-lg px-4 py-2 text-white disabled:bg-gray-400'
          >
            Previous
          </Button>

          <span className='text-lg'>
            Page {currentPage + 1} of {totalPages}
          </span>

          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className='rounded-lg px-4 py-2 text-white disabled:bg-gray-400'
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

function ImageWithLoading({ src, alt }: { src: string; alt: string }) {
  const [loading, setLoading] = useState(true)

  return (
    <div className='relative h-[180px] w-full overflow-hidden rounded-lg bg-gray-200'>
      {loading && (
        <div className='absolute inset-0 animate-pulse bg-gray-200'></div>
      )}
      <Link href={src} target='_blank' rel='noopener noreferrer'>
        <Image
          src={src}
          alt={alt}
          layout='fill'
          objectFit='cover'
          className={`rounded-lg transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoadingComplete={() => setLoading(false)}
        />
      </Link>
    </div>
  )
}
