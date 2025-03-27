import Navbar from '@/components/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen flex-col'>
      <Navbar />
      <main className='flex flex-1 flex-col overflow-hidden'>{children}</main>
    </div>
  )
}
