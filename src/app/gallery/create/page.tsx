import GalleryDetailSection from '@/components/gallery-page/gallery-detail'

export default function CreateGalleryPage() {
  return (
    <div className='w-full'>
      <div className='shadow-right h-full w-1/4 shadow-lg shadow-black/100'>
        {/* defaultValues */}
        <GalleryDetailSection
          name='Gallery'
          description='This is my gallery'
          price={10}
        />
      </div>
      <div className='w-3/4'></div>
    </div>
  )
}
