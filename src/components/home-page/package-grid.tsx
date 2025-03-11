import PackageCard from './package-card'
import { PackageProps } from './package-card'

interface PackageGridProps {
  packagecards: PackageProps[]
}

export default function PackageGrid({ packagecards }: PackageGridProps) {
  return (
    <div className='flex justify-center'>
      <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {packagecards.map((pkg, index) => (
          <PackageCard key={index} {...pkg} />
        ))}
      </div>
    </div>
  )
}
