import { ArrowLeft } from 'lucide-react'

interface GoBackButtonProps {
  onClick: () => void
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='absolute left-4 top-[80px] z-10 mb-4 inline-flex items-center rounded-lg bg-black bg-opacity-10 px-4 py-2 text-sm font-bold text-white hover:bg-opacity-20 focus:outline-none md:top-[70px]'
    >
      <ArrowLeft className='mr-2' /> Go Back
    </button>
  )
}

export default GoBackButton
