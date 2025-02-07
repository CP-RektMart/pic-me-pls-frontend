import Container from '@/components/container'

export default function NotFound() {
  return (
    <div className='flex flex-1 items-center justify-center min-h-screen text-center'>
      <Container>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <h1 className='animate-bounce text-3xl font-semibold'>
        404
        <br />
        Page Not Found
        </h1>
        <p>
        The requested URL was not found.
        <br />
        That’s all we know.
        </p>
      </div>
      </Container>
    </div>
  )
}
