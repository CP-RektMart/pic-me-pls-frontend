import { Icon } from '@iconify/react/dist/iconify.js'
import LogoTrans from '@public/icons/logo-trans.svg'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { SidebarMobile } from './sidebar-mobile'

export const Navbar = () => {
  return (
    <div className='flex flex-initial items-center justify-between gap-4 bg-base-primary px-6 py-4 text-white'>
      <Link href='/admin' className='flex items-center'>
        <div className='flex gap-4'>
          <Image
            src={LogoTrans}
            className='aspect-square object-fill'
            alt='Logo'
            width={24}
            height={24}
          />
          <p className='text-base font-medium lg:text-xl'>Admin</p>
        </div>
      </Link>

      <div className='flex gap-1'>
        <Button variant='ghost' className='relative size-9'>
          <Icon icon='lucide:bell' className='size-4' />
        </Button>
        <SidebarMobile />
      </div>
    </div>
  )
}
