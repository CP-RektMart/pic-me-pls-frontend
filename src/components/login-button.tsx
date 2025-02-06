import { UserType } from '@/type/user'
import Image from 'next/image'

export default function LoginButton({
  userType,
  onClick,
}: {
  userType?: UserType
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className='flex h-[154px] w-[152px] flex-col items-center justify-center gap-[10px] rounded-2xl bg-white p-6 shadow-[2px_2px_2px_rgba(0,0,0,0.25)] hover:cursor-pointer'
    >
      <Image
        src={
          userType === 'Photographer'
            ? 'PhotographerLoginIcon.svg'
            : 'CustomerLoginIcon.svg'
        }
        alt={`${userType} Icon`}
        width={106}
        height={72}
        priority={true}
      />
      <div>{userType}</div>
    </button>
  )
}
