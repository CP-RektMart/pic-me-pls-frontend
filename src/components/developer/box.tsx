'use client'

import { useState } from 'react'

import { Icon } from '@iconify/react/dist/iconify.js'

export const Box = ({ title, text }: { title: string; text: string }) => {
  'use client'

  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
    } catch (error) {
      console.error('Failed to copy: ', error)
    }
  }

  return (
    <div>
      <h2 className='text-lg font-medium'>{title}</h2>
      <p
        onClick={handleCopy}
        onMouseLeave={() => setIsCopied(false)}
        className='group relative cursor-pointer break-all rounded bg-gray-800 p-4 pr-12 text-white'
      >
        {text}
        <Icon
          icon={!isCopied ? 'lucide:copy' : 'lucide:check'}
          className='absolute right-4 top-4 hidden size-4 group-hover:block'
        />
      </p>
    </div>
  )
}
