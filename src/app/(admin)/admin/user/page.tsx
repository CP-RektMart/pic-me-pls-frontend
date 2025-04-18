import { SidebarProvider } from '@/components/admin/common/sidebar-provider'
import AdminUser from '@/components/admin/user'

export default function AdminUserPage() {
  return (
    <SidebarProvider>
      <AdminUser />
    </SidebarProvider>
  )
}
