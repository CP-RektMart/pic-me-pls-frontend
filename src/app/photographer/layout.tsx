import { Navbar } from '@/components/photographer/common/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='flex w-full flex-1'>{children}</main>
    </>
  )
}
