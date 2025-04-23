import { SidebarProvider } from '@/components/photographer/common/sidebar-provider'

export function Ban() {
  return (
    <SidebarProvider>
      <main className='flex flex-1 flex-col overflow-hidden'></main>
      <div className='flex h-full w-full items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>บัญชีของคุณถูกระงับ</h1>
          <p className='mt-4'>กรุณาติดต่อผู้ดูแลระบบเพื่อขอข้อมูลเพิ่มเติม</p>
        </div>
      </div>
    </SidebarProvider>
  )
}
