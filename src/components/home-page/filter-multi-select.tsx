'use client'

import { MultiSelect } from '@/components/ui/multi-select'

const categoriesList = [
  { value: 'wedding', label: 'งานแต่ง' },
  { value: 'funeral', label: 'งานศพ' },
  { value: 'graduation', label: 'งานรับปริญญา' },
  { value: 'kid', label: 'เด็ก' },
  { value: 'loveyourmom', label: 'ถ่ายแม่มึง' },
]

export default function FilterMultiSelect({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[]
  setSelectedCategories: (value: string[]) => void
}) {
  return (
    <div className='w-full'>
      <MultiSelect
        options={categoriesList}
        onValueChange={setSelectedCategories}
        value={selectedCategories}
        placeholder='Select Category'
        variant='inverted'
        animation={0}
        maxCount={1}
      />
    </div>
  )
}
