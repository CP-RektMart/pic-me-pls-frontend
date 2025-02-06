import {
  FileChartColumn,
  House,
  LogOut,
  MessageCircle,
  Package,
  User,
} from 'lucide-react'

export const navItems = [
  { icon: House, title: 'Home', url: '/' },
  { icon: FileChartColumn, title: 'Quotation', url: '/quotation' },
  { icon: Package, title: 'Package', url: '/package' },
  { icon: MessageCircle, title: 'Review', url: '/review' },
  { icon: User, title: 'Profile', url: '/profile' },
  { icon: LogOut, title: 'Logout', url: '#' },
]
