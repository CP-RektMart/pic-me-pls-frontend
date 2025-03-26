import { Icon } from '@iconify/react/dist/iconify.js'
import LogoTrans from '@public/icons/logo-trans.svg'
import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <Link href='/' className='flex items-center'>
        <div>
          <Image
            src={LogoTrans}
            className='aspect-square object-fill'
            alt='Logo'
            width={24}
            height={24}
          />
          <p className='text-xl font-medium'>Photographer</p>c
        </div>
      </Link>

      <div className='relative size-4'>
        <Icon icon='lucide:bell' className='size-full' />
      </div>
    </div>
  )
}
