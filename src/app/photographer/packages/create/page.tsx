import GalleryDetailSection from '@/components/gallery-page/gallery-detail'
import PhotoCard from '@/components/gallery-page/photoCard'

export default function CreateGalleryPage() {
  const galleries = [...Array(8)]
  return (
    <div className='flex w-full flex-col lg:flex-row'>
      <div className='shadow-right h-full shadow-lg shadow-black/100 lg:w-1/4'>
        {/* defaultValues */}
        <GalleryDetailSection
          name='Gallery'
          description='This is my gallery'
          price={10}
        />
      </div>
      <div className='lg:w-3/4'>
        <div className='grid grid-cols-2 gap-4 p-4 lg:grid-cols-4'>
          {galleries.map((_, i) => (
            <div className='flex' key={i}>
              <PhotoCard
                key={i}
                description='My Gallery'
                imageUrl='/mockPhotoCard.svg'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
