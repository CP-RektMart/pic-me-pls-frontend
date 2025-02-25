'use client'

import { useState } from 'react'

import { MultiSelect } from '@/components/ui/multi-select'

const categoriesList = [
  { value: 'wedding', label: 'งานแต่ง' },
  { value: 'funeral', label: 'งานศพ' },
  { value: 'graduation', label: 'งานรับปริญญา' },
  { value: 'kid', label: 'เด็ก' },
  { value: 'loveyourmom', label: 'ถ่ายแม่มึง' },
]

export default function FilterMultiSelect() {
  const [selectedCategories, setselectedCategories] = useState<string[]>([])

  return (
    <div className='max-w-xl'>
      <MultiSelect
        options={categoriesList}
        onValueChange={setselectedCategories}
        defaultValue={selectedCategories}
        placeholder='Select Category'
        variant='inverted'
        animation={0}
        maxCount={1}
      />
    </div>
  )
}
