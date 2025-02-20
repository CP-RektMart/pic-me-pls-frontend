import GalleryDetailSection from '@/components/gallery-page/gallery-detail'
import PhotoCard from '@/components/gallery-page/photoCard'

export default function CreateGalleryPage() {
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
      <div className='lg: space-2 grid-cols-2 lg:w-3/4 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <PhotoCard key={i} description='My Gallery' />
        ))}
      </div>
    </div>
  )
}
