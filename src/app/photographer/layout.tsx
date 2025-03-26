import { Navbar } from '@/components/photographer/common/navbar'
import { Sidebar } from '@/components/photographer/common/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='flex w-full flex-1'>
        <Sidebar />
        <div className='flex-1 bg-gray-100'>{children}</div>
      </main>
    </>
  )
}
