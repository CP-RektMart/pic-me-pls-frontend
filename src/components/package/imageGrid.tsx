import { useState } from 'react'

import { Media } from '@/types/package'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function ImageGrid({ media }: { media: Media[] }) {
  const imagesPerPage = 6
  const totalPages = Math.ceil(media.length / imagesPerPage)

  const [currentPage, setCurrentPage] = useState(0)
  const [selectedMedia, setSelectedMedia] = useState<Media>()

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
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Button
                  variant='secondary'
                  className='relative h-[180px] w-full'
                  onClick={() => setSelectedMedia(mediaItem)}
                >
                  <ImageWithLoading
                    src={mediaItem.pictureUrl || '/default.jpg'}
                    alt={`Image ${index + 1}`}
                  />
                </Button>
              </DialogTrigger>

              {selectedMedia && selectedMedia === mediaItem && (
                <DialogContent className='max-w-sm rounded-lg bg-white md:max-w-6xl'>
                  <DialogHeader>
                    <DialogTitle className='text-l px-4 py-1 text-center font-bold text-black'>
                      {selectedMedia.description}
                    </DialogTitle>
                  </DialogHeader>
                  <div className='relative flex h-[300px] w-full items-center justify-center md:h-[600px]'>
                    {selectedMedia?.pictureUrl && (
                      <ImageWithLoading
                        src={selectedMedia.pictureUrl || '/default.jpg'}
                        alt='Full size'
                      />
                    )}
                  </div>
                </DialogContent>
              )}
            </Dialog>
          ) : (
            <div
              key={index}
              className='relative w-full bg-transparent md:h-[180px]'
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

          <span className='mr-3 text-lg'>
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
    <>
      {loading && (
        <div className='absolute inset-0 animate-pulse bg-gray-200'></div>
      )}
      <Image
        src={src}
        alt={alt}
        layout='fill'
        objectFit='cover'
        className={`rounded-lg transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoadingComplete={() => setLoading(false)}
      />
    </>
  )
}
