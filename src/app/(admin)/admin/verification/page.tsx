import { SidebarProvider } from '@/components/admin/common/sidebar-provider'
import AdminVerification from '@/components/admin/verification'

export default function AdminVerificationPage() {
  return (
    <SidebarProvider>
      <AdminVerification />
    </SidebarProvider>
  )
}
