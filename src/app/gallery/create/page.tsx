import GalleryDetailSection from '@/components/gallery-page/gallery-detail'

export default function CreateGalleryPage() {
  return (
    <div className='w-full'>
      <div className='w-1/4'>
        {/* defaultValues */}
        <GalleryDetailSection
          name='Gallery'
          description='This is my gallery'
          price={0}
        />
      </div>
      <div className='w-3/4'></div>
    </div>
  )
}
