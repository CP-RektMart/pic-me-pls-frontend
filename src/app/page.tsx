import Container from '@/components/container'

export default async function Home() {
  return (
    <div className='flex flex-1 items-center justify-center bg-gradient-to-b from-base-primary to-base-quinary text-center'>
      <Container>
        <div className='flex flex-col items-center justify-center space-y-4 bg-gradient-to-tr from-white to-base-secondary bg-clip-text text-transparent'>
          <h1 className='text-9xl font-semibold'>Pic Me Pls</h1>
          <p className='animate-pulse text-2xl font-medium text-white'>
            Connecting with your desired photographers.
          </p>
        </div>
      </Container>
    </div>
  )
}
