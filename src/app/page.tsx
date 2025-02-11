import LoginButton from '@/components/login-page/login-button'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div>
      <div>Pic me pls YOYO</div>
      <div>
        <Button>Button from shadcn</Button>
      </div>
      <div className='flex flex-row space-x-2'>
        <div className='size-10 rounded-full bg-base-primary'></div>
        <div className='size-10 rounded-full bg-base-secondary'></div>
        <div className='size-10 rounded-full bg-base-tertiary'></div>
        <div className='size-10 rounded-full bg-base-quaternary'></div>
        <div className='size-10 rounded-full bg-base-quinary'></div>
      </div>
      <div className='flex flex-row space-x-2'>
        <LoginButton userType='Customer' isActive={false} />
        <LoginButton userType='Photographer' isActive={false} />
      </div>
    </div>
  )
}
