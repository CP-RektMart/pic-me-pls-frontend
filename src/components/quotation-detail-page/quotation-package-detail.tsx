import Image from 'next/image'

export default function QuotationPackageDetail() {
  return (
    <div className='gap-6 p-6'>
      <div className='flex flex-row items-center'>
        <Image
          src='/photographerProfile.svg'
          alt='Photographer'
          className='rounded-full'
          width={112}
          height={112}
        />
      </div>
    </div>
  )
}
