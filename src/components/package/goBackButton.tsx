import { Icon } from '@iconify/react'

import { Button } from '@/components/ui/button'

interface GoBackButtonProps {
  onClick: () => void
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className='absolute left-4 top-20 z-10 bg-black bg-opacity-40 text-sm font-bold text-white'
    >
      <Icon icon='lucide:arrow-left' className='size-5' />
      Back
    </Button>
  )
}

export default GoBackButton
