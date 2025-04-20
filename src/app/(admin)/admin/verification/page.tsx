import { SidebarProvider } from '@/components/admin/common/sidebar-provider'
import AdminVerificationPage from '@/components/admin/verification'

export default function AdminPackagePage() {
  return (
    <SidebarProvider>
      <AdminVerificationPage />
    </SidebarProvider>
  )
}
