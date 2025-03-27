import { Navbar } from '@/components/photographer/common/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen flex-col'>
      <Navbar />
      {children}
    </div>
  )
}
