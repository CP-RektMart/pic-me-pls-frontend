import {
  Bell,
  FileChartColumn,
  House,
  LogOut,
  MessageCircle,
  Package,
  User,
} from 'lucide-react'

import Menu from '@/components/navbar/menu'

export default function Navbar() {
  return (
    <nav className='flex h-14 flex-row items-center justify-between bg-base-primary p-4 text-white'>
      <div className="font-['Poppins'] text-base font-bold">PicMePls</div>
      <div className='flex flex-row gap-6'>
        <Menu icon={<House size={16} />} text='Home' />
        <Menu icon={<FileChartColumn size={16} />} text='Quotation' />
        <Menu icon={<Package size={16} />} text='Package' />
        <Menu icon={<MessageCircle size={16} />} text='Review' />
        <Menu icon={<User size={16} />} text='Profile' />
        <Menu icon={<LogOut size={16} />} text='Logout' />
      </div>
      <div className='flex flex-row space-x-4'>
        <Bell size={16} />
      </div>
    </nav>
  )
}
