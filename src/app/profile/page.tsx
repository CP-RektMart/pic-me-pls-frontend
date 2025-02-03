import { Save } from 'lucide-react';

export default function ProfilePage() { 
    return (
        <div className="px-8 gap-24px mx-12 my-6 flex-col">
            <div className="flex flex-row h-[40px]">
                <h1 className="font-bold text-3xl">Edit Profile</h1>
                <div className='border rounded-md px-4 py-2 ml-auto bg-zinc-800 flex items-center'>
                    <Save size={16} className='text-white' />
                </div>
            </div>

        </div>
    )
}