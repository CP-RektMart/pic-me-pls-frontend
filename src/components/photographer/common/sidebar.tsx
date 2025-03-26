import { photographerItems } from '@/data/nav-items'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export const Sidebar = () => {
  return (
    <div className='flex h-full w-72 flex-col gap-2 px-5 py-4'>
      {photographerItems.map((item) => (
        <Link href={item.url} key={item.title}>
          <Button variant='ghost' className='flex w-full justify-start'>
            <div className='flex size-6 flex-col items-center justify-center'>
              <Icon icon={item.icon} className='size-full' />
            </div>
            <div className='font-medium'>{item.title}</div>
          </Button>
        </Link>
      ))}
    </div>
  )
}
