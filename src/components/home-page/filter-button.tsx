import { Icon } from '@iconify/react'

import { Button } from '../ui/button'

export default function SearchFilterButton({
  searchOptionType,
}: {
  searchOptionType: 'filter' | 'sort' | ''
}) {
  return (
    <Button variant='searchFilter' size='searchFilter'>
      <Icon
        icon={
          searchOptionType === 'filter'
            ? 'lucide:filter'
            : searchOptionType === 'sort'
              ? 'lucide:arrow-down-wide-narrow'
              : ''
        }
        className='size-4'
      />
    </Button>
  )
}
