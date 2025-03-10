import { Icon } from '@iconify/react'

import { Button } from '../ui/button'

export default function FilterButton({
  OptionType,
}: {
  OptionType: 'Filter' | 'Sort' | ''
}) {
  return (
    <Button variant='filter'>
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
