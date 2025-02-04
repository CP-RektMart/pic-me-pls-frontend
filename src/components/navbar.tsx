export default function Navbar() {
  return (
    <nav className='flex flex-row items-center justify-between bg-base-primary p-4'>
      <div className='text-base-secondary'>Logo</div>
      <div className='flex flex-row space-x-4'>
        <a href='#' className='text-base-secondary'>
          Home
        </a>
        <a href='#' className='text-base-secondary'>
          About
        </a>
        <a href='#' className='text-base-secondary'>
          Contact
        </a>
      </div>
    </nav>
  )
}
