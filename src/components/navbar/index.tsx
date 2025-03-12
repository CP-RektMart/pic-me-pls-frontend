'use client'

import { useMemo } from 'react'

import { logout } from '@/actions/logout'
import {
  customerItems,
  defaultItems,
  photographerItems,
} from '@/data/nav-items'
import { Icon } from '@iconify/react'
import LogoTrans from '@public/logo-trans.svg'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { NavButton } from '@/components/navbar/nav-button'
import Sidebar from '@/components/sidebar/index'

export default function Navbar() {
  const { data: session, status } = useSession()

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

  const navItems = useMemo(() => {
    if (status !== 'authenticated') {
      return defaultItems
    }

    if (session?.user?.role === 'PHOTOGRAPHER') {
      return photographerItems
    }

    return customerItems
  }, [session?.user?.role, status])

  return (
    <nav className='sticky flex w-full flex-row items-center justify-between bg-base-primary px-6 py-4 text-white'>
      <Link href='/' className='flex items-center'>
        <Image
          src={LogoTrans}
          className='aspect-square object-fill'
          alt='Logo'
          width={24}
          height={24}
        />
      </Link>
      <div className='hidden flex-row gap-6 lg:flex'>
        {navItems.slice(0, 5).map((item, index) => (
          <NavButton
            key={index}
            icon={item.icon}
            title={item.title}
            link={item.url}
          />
        ))}
        {status === 'authenticated' ? (
          <NavButton
            icon='lucide:log-out'
            title='Logout'
            link='#'
            handleOnClick={handleLogout}
          />
        ) : (
          <NavButton icon='lucide:log-in' title='Login' link='/login' />
        )}
      </div>
      <div className='flex flex-row items-center space-x-4'>
        <div className='relative size-4'>
          <Icon icon='lucide:bell' className='size-full' />
        </div>
        <Sidebar handleLogout={handleLogout} />
      </div>
    </nav>
  )
}
