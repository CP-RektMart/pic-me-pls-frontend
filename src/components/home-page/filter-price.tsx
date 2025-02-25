import { Input } from '../ui/input'

export default function FilterPrice() {
  return (
    <div className='flex justify-center gap-4'>
      <div className='flex flex-col gap-1'>
        <div className='text-sm font-medium'>Min Price (Baht)</div>
        <Input placeholder='200.00' type='number' />
      </div>
      <div className='flex flex-col gap-1'>
        <div className='text-sm font-medium'>Max Price (Baht)</div>
        <Input placeholder='1000.50' type='number' />
      </div>
    </div>
  )
}
