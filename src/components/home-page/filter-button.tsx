import { Icon } from '@iconify/react'

import { Button } from '../ui/button'

export default function FilterButton({
  OptionType,
  onClick,
}: {
  OptionType: 'Filter' | 'Sort' | ''
  onClick?: () => void
}) {
  return (
    <Button variant='filter' onClick={onClick}>
      <Icon
        icon={
          OptionType === 'Filter'
            ? 'lucide:filter'
            : OptionType === 'Sort'
              ? 'lucide:arrow-down-wide-narrow'
              : ''
        }
        className='size-4'
      />
    </Button>
  )
}
