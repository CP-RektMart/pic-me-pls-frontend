import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import FilterMultiSelect from './filter-multi-select'
import FilterPrice from './filter-price'

export default function FilterPopover() {
  return (
    <Tabs
      defaultValue='package'
      className='flex w-80 flex-col gap-2 rounded-md border border-gray-200 p-4 shadow-md shadow-black/10'
    >
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='package'>Package</TabsTrigger>
        <TabsTrigger value='photographer'>Photographer</TabsTrigger>
      </TabsList>
      <TabsContent value='package' className='flex flex-col gap-4'>
        <FilterPrice />
        <FilterMultiSelect />
      </TabsContent>
      <TabsContent value='photographer'>
        <div>Photographer Content</div>
      </TabsContent>
    </Tabs>
  )
}
