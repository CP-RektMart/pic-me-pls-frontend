import Image from 'next/image'

export default function QuotationPackageDetail() {
  return (
    <div className='gap-6 p-6'>
      <div className='flex flex-row items-center gap-6'>
        <Image
          src='/photographerProfile.svg'
          alt='Photographer'
          className='rounded-full'
          width={112}
          height={112}
        />
        <div className='flex flex-col'>
          <div className='flex flex-row gap-2.5 text-2xl font-bold'>
            Patthapol Kittikun
          </div>
          <div className='text-sm font-medium text-gray-500'>10 Galleries</div>
        </div>
      </div>
    </div>
  )
}
