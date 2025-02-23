import Image from 'next/image'

export default function Greeting({ Name }: { Name: string }) {
  return (
    <div className='flex items-center gap-2'>
      {Name ? (
        <Image src='Pol.svg' alt='userImage' width={48} height={48} />
      ) : (
        <div className='size-12 rounded-full bg-black/20'></div>
      )}
      <div className='flex flex-col'>
        <div className='text-xs text-slate-400'>Good to see you 👋</div>
        <div className='text-2xl font-medium'>{Name || 'Guest'}</div>
      </div>
    </div>
  )
}
