import { SidebarProvider } from '@/components/admin/common/sidebar-provider'
import AdminPackage from '@/components/admin/package'

export default function AdminPackagePage() {
  return (
    <SidebarProvider>
      <AdminPackage />
    </SidebarProvider>
  )
}
