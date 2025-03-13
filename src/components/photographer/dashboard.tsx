import { Container } from '../container'

export const PhotographerDashboard = () => {
  return (
    <Container className='space-y-8 py-6'>
      <h1 className='text-2xl font-bold'>Overview</h1>
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
          <div className='aspect-video rounded-xl bg-muted/50' />
          <div className='aspect-video rounded-xl bg-muted/50' />
          <div className='aspect-video rounded-xl bg-muted/50' />
        </div>
        <div className='h-[40vh] w-full rounded-xl bg-muted/50' />
      </div>
    </Container>
  )
}
