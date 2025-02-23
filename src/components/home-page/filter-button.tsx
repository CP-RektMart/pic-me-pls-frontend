import { Icon } from '@iconify/react'

import { Button } from '../ui/button'

export default function SearchFilterButton({
  searchOptionType,
}: {
  searchOptionType: 'Filter' | 'Sort' | ''
}) {
  return (
    <Button variant='searchFilter'>
      <Icon
        icon={
          searchOptionType === 'Filter'
            ? 'lucide:filter'
            : searchOptionType === 'Sort'
              ? 'lucide:arrow-down-wide-narrow'
              : ''
        }
        className='size-4'
      />
    </Button>
  )
}
