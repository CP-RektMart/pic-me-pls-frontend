import { photographerItems } from '@/data/nav-items'
import { Icon } from '@iconify/react/dist/iconify.js'

export const Sidebar = () => {
  return (
    <div className='h-full w-72 px-5 py-4'>
      {photographerItems.map((item) => (
        <div key={item.title}>
          <div className='size-24'>
            <Icon icon={item.icon} className='size-full' />
          </div>
          <div className='font-medium'>{item.title}</div>
        </div>
      ))}
    </div>
  )
}
