export const photographerItems = [
  { icon: 'lucide:home', title: 'Home', url: '/photographer' },
  {
    icon: 'lucide:file-chart-column',
    title: 'Quotation',
    url: '/photographer/quotations',
  },
  { icon: 'lucide:package', title: 'Package', url: '/photographer/packages' },
  { icon: 'lucide:message-square', title: 'Chat', url: '/photographer/chat' },
  { icon: 'lucide:user', title: 'Profile', url: '/photographer/profile' },
]

export const customerItems = [
  { icon: 'lucide:home', title: 'Home', url: '/' },
  {
    icon: 'lucide:file-chart-column',
    title: 'Quotation',
    url: '/quotation',
  },
  { icon: 'lucide:message-square', title: 'Chat', url: '/chat' },
  { icon: 'lucide:user', title: 'Profile', url: '/profile' },
  { icon: 'lucide:activity', title: 'Report', url: '/report' },
]

export const adminItems = [
  {
    icon: 'lucide:layout-dashboard',
    title: 'Dashboard',
    url: '/admin',
    description: 'Monitor System Overview',
    btn: 'Go to Dashboard',
  },
  {
    icon: 'lucide:id-card',
    title: 'Review Verification',
    url: '/admin/verification',
    description: 'Verify Photographer Identity',
    btn: 'Manage Verification',
  },
  {
    icon: 'lucide:camera',
    title: 'Photographer Manager',
    url: '/admin/photographers',
    description: "Manage Photographers' Status",
    btn: 'Manage Photographers',
  },
  {
    icon: 'lucide:package',
    title: 'Package Manager',
    url: '/admin/package',
    description: 'Manage Package in the System',
    btn: 'Manage Packages',
  },
  {
    icon: 'lucide:triangle-alert',
    title: 'Report Manager',
    url: '/admin/report',
    description: 'Manage reports in the system',
    btn: 'Manage Reports',
  },
  {
    icon: 'lucide:user',
    title: 'User Manager',
    url: '/admin/user',
    description: 'Manage users in the system',
    btn: 'Manage Users',
  },
]

export const defaultItems = [{ icon: 'lucide:home', title: 'Home', url: '/' }]
