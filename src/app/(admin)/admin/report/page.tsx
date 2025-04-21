import { SidebarProvider } from '@/components/admin/common/sidebar-provider'
import { AdminReport } from '@/components/admin/report'

export default function AdminReportPage() {
  return (
    <SidebarProvider>
      <AdminReport />
    </SidebarProvider>
  )
}
