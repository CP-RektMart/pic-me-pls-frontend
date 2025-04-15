import { SidebarProvider } from '@/components/admin/common/sidebar-provider'

import { ChartAreaInteractive } from '../chart-area-interactive'
import { DataTable } from '../data-table'
import { SectionCards } from '../section-cards'
import data from './data.json'

export const AdminDashboard = () => {
  return (
    <SidebarProvider>
      <h1 className='text-2xl font-bold'>Overview</h1>
      <div className='flex flex-col gap-4 md:gap-6'>
        <SectionCards />
        <ChartAreaInteractive />
        <DataTable data={data} />
      </div>
    </SidebarProvider>
  )
}
