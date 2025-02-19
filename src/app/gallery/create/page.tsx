import GalleryDetailSection from '@/components/gallery-page/gallery-detail'

export default function CreateGalleryPage() {
  return (
    <div className='w-full'>
      <div className='shadow-right h-full w-1/3 shadow-lg shadow-black/100'>
        {/* defaultValues */}
        <GalleryDetailSection
          name='Gallery'
          description='This is my gallery'
          price={10}
        />
      </div>
      <div className='w-2/3'></div>
    </div>
  )
}
