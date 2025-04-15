import { adminItems } from '@/data/nav-items'
import Link from 'next/link'

import { SidebarProvider } from '@/components/admin/common/sidebar-provider'

import { ChartAreaInteractive } from '../chart-area-interactive'
import { SectionCards } from '../section-cards'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

export const AdminDashboard = () => {
  return (
    <SidebarProvider>
      <h1 className='text-2xl font-bold'>Management</h1>
      <div className='grid grid-cols-2 gap-4 md:gap-6'>
        {adminItems.map((item) => (
          <Card key={item.title} className='@container/card'>
            <CardHeader className='relative'>
              <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
                {item.title}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <div className='absolute right-4 top-4'></div>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                {/* Trending up this month <TrendingUpIcon className='size-4' /> */}
              </div>
              <Link
                href={item.url}
                className='ml-auto h-9 rounded-lg bg-primary px-4 py-2 text-primary-foreground shadow hover:bg-primary/90'
              >
                {item.btn}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <h1 className='text-2xl font-bold'>Overview</h1>
      <div className='flex flex-col gap-4 md:gap-6'>
        <SectionCards />
        <ChartAreaInteractive />
      </div>
    </SidebarProvider>
  )
}
