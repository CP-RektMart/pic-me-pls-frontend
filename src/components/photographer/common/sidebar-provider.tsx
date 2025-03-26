import { Sidebar } from './sidebar'

interface SidebarProviderProps {
  children: React.ReactNode
}
export const SidebarProvider = (props: SidebarProviderProps) => {
  const { children } = props

  return (
    <main className='flex w-full flex-1'>
      <Sidebar />
      <div className='flex-1 space-y-6 bg-gray-100 px-8 py-4 lg:py-6'>
        {children}
      </div>
    </main>
  )
}
