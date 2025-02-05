import SignInForm from '@/components/sign-in-form'
import { Button } from '@/components/ui/button'
import { Icon } from "@iconify/react";
import SignInDrawer from '@/components/sign-in-drawer';

export default function Home() {
  return (
    <>
      <div>Pic me pls YOYO</div>
      <div>
        <Button>Button from shadcn</Button>
      </div>
      <div>YOYO branch logout wei</div>
      <div className='flex flex-row space-x-2'>
        <div className='size-10 rounded-full bg-base-primary'></div>
        <div className='size-10 rounded-full bg-base-secondary'></div>
        <div className='size-10 rounded-full bg-base-tertiary'></div>
        <div className='size-10 rounded-full bg-base-quaternary'></div>
        <div className='size-10 rounded-full bg-base-quinary'></div>
      </div>
    </>
  )
}