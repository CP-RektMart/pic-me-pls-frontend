import { Sidebar } from './sidebar'

interface SidebarProviderProps {
  children: React.ReactNode
}
export const SidebarProvider = (props: SidebarProviderProps) => {
  const { children } = props

  return (
    <div className='flex flex-1 overflow-hidden bg-purple-400'>
      <Sidebar />
      <div className='flex flex-1 flex-col gap-6 overflow-y-auto bg-gray-100 p-6'>
        {children}
      </div>
    </div>
  )
}
