import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button'

export default function ProfilePage() { 
    const isPhotographer: boolean = true;
    return (
        <div className="lg:px-8 gap-6 mx-12 my-6 flex-col space-y-6">
            <div className="flex flex-row h-[40px]">
                <h1 className="font-bold text-[24px] items-center self-center lg:text-3xl">Edit Profile</h1>
                <div className='border rounded-md px-4 py-2 ml-auto bg-zinc-800 flex items-center'>
                    <Save size={16} className='text-white' />
                </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-8'>
                <div className="flex-1 flex justify-center">
                    <img src="image.png" className="rounded-full my-8 max-w-[200px] max-h-[200px]"/>
                </div>
                <div className='space-y-8 flex-1'>
                    <div className='space-y-1'>
                        <p className='h-[21px]'>Name</p>
                        <input type='text' className='w-full border rounded-md px-4 py-2' placeholder='John Doe'/>
                    </div>
                    <div className='space-y-1'>
                        <p className='h-[21px]'>Email</p>
                        <input type='text' className='w-full border rounded-md px-4 py-2' placeholder='admin@picmepls.com'/>
                    </div>
                    <div className='space-y-1'>
                        <p className='h-[21px]'>Phone</p>
                        <input type='text' className='w-full border rounded-md px-4 py-2' placeholder='0xx-xxx-xxxx'/>
                    </div>
                    <div className='space-y-1'>
                        <p className='h-[21px]'>Facebook</p>
                        <input type='text' className='w-full border rounded-md px-4 py-2' placeholder='Facebook'/>
                    </div>
                    <div className='space-y-1'>
                        <p className='h-[21px]'>Instagram</p>
                        <input type='text' className='w-full border rounded-md px-4 py-2' placeholder='instagram'/>
                    </div>
                    {isPhotographer? 
                    <div className='space-y-8 flex-1'>
                        <hr className="border-t border-zinc-200" />
                        <h2 className="font-bold text-[24px] items-center self-center">Payment Method</h2>
                        <div className='space-y-1'>
                            <p className='h-[21px]'>Bank</p>
                            <input type='text' className='w-full border rounded-md px-4 py-2' placeholder='SCB'/>
                        </div>
                        <div className='space-y-1'>
                            <p className='h-[21px]'>Account No.</p>
                            <input type='text' className='w-full border rounded-md px-4 py-2' placeholder='360-411175-6'/>
                        </div>
                        <div className='space-y-1'>
                            <p className='h-[21px]'>Branch</p>
                            <input type='text' className='w-full border rounded-md px-4 py-2' placeholder='Future Park Rangsit'/>
                        </div>
                        <Button>Revalidate Account</Button>
                    </div> 
                    : null}   
                </div>
            </div>
        </div>
    )
}