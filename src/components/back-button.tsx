'use client'

import { Icon } from '@iconify/react/dist/iconify.js'
import { useRouter } from 'next/navigation'

import { Button } from './ui/button'

interface BackButtonProps {
  href?: string
}

export const BackButton = (props: BackButtonProps) => {
  const { href } = props

  const router = useRouter()

  return (
    <Button
      onClick={() => (href ? router.push(href) : router.back())}
      variant='ghost'
      className='size-9 rounded-full p-2 hover:bg-gray-200'
    >
      <Icon icon='lucide:chevron-left' className='size-5' />
    </Button>
  )
}
