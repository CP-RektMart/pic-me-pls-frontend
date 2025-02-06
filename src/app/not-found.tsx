export default function NotFound() {
  return (
    <div className='h-[89.5vh] p-6 text-center'>
      <div className='flex h-full flex-col items-center justify-center space-y-4'>
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
    </div>
  )
}
