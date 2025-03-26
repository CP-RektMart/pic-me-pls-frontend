'use client'

import { logout } from '@/actions/logout'
import { photographerItems } from '@/data/nav-items'
import { Icon } from '@iconify/react/dist/iconify.js'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export const Sidebar = () => {
  const handleLogout = async () => {
    const result = await logout()
    if (result?.error) {
      console.error(result.error)
      return
    }
    await signOut({
      redirect: true,
      redirectTo: '/',
    })
  }

  return (
    <div className='flex h-full w-72 flex-initial flex-col justify-between gap-2 bg-white px-5 py-4 drop-shadow'>
      <div className='flex flex-1 flex-col gap-2'>
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

      <Button
        onClick={handleLogout}
        variant='ghost'
        className='flex w-full justify-start'
      >
        <div className='flex size-6 flex-col items-center justify-center'>
          <Icon icon='lucide:log-out' className='size-full' />
        </div>
        <div className='font-medium'>Logout</div>
      </Button>
    </div>
  )
}
