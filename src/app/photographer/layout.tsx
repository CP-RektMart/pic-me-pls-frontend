import { client } from '@/api/client'

import { Ban } from '@/components/photographer/ban'
import { Navbar } from '@/components/photographer/common/navbar'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data } = await client.GET('/api/v1/photographer/me')

  if (data?.result?.isBaned) {
    return (
      <div className='flex h-screen flex-col'>
        <Navbar />
        <main className='flex flex-1 flex-col overflow-hidden'>
          <Ban />
        </main>
      </div>
    )
  }

  return (
    <div className='flex h-screen flex-col'>
      <Navbar />
      <main className='flex flex-1 flex-col overflow-hidden'>{children}</main>
    </div>
  )
}
