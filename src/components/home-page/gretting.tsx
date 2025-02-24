import Image from 'next/image'

export default function Greeting({ userName }: { userName: string }) {
  return (
    <div className='flex items-center gap-2'>
      {userName ? (
        <div className='size-12 min-w-12 rounded-full'>
          <Image src='Pol.svg' alt='userImage' width={48} height={48} />
        </div>
      ) : (
        <div className='size-12 min-w-12 rounded-full bg-black/20'></div>
      )}
      <div className='flex flex-col'>
        <div className='text-xs text-slate-400 md:whitespace-nowrap'>
          Good to see you 👋
        </div>
        <div className='text-2xl font-medium md:whitespace-nowrap'>
          {userName || 'Guest'}
        </div>
      </div>
    </div>
  )
}
