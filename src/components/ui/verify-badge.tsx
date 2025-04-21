import { Icon } from '@iconify/react/dist/iconify.js'

import { Badge } from './badge'

interface VerifyBadgeProps {
  isVerified: boolean
}
export const VerifyBadge = (props: VerifyBadgeProps) => {
  const { isVerified } = props

  if (!isVerified) {
    return (
      <Badge variant='secondary' className='gap-1 bg-red-100 text-red-700'>
        <Icon icon='lucide:x-circle' />
        Not Verified
      </Badge>
    )
  }

  return (
    <Badge variant='secondary' className='gap-1 bg-green-100 text-green-700'>
      <Icon icon='lucide:verified' />
      Verified
    </Badge>
  )
}
