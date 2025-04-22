import { SidebarProvider } from '@/components/admin/common/sidebar-provider'
import AdminPhotographers from '@/components/admin/photographers'

export default function AdminPhotgrapherPage() {
  return (
    <SidebarProvider>
      <AdminPhotographers />
    </SidebarProvider>
  )
}
