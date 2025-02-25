import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function FilterPopover() {
  return (
    <Tabs
      defaultValue='package'
      className='flex w-80 flex-col gap-4 rounded-md border border-gray-200 p-4 shadow-md shadow-black/10'
    >
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='package'>Package</TabsTrigger>
        <TabsTrigger value='photographer'>Photographer</TabsTrigger>
      </TabsList>
      <TabsContent value='package'>
        <div>Package Content</div>
      </TabsContent>
      <TabsContent value='photographer'>
        <div>Photographer Content</div>
      </TabsContent>
    </Tabs>
  )
}
