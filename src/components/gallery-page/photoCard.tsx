import Image from 'next/image'

export default function PhotoCard() {
  return (
    <div className='flex flex-col rounded-2xl'>
      <Image src='/mockPhotoCard.svg' alt='image' className='h-3/4 w-full' />
      <div className='h-1/4 w-full'></div>
    </div>
  )
}
