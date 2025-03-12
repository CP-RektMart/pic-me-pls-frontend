import PackageCard from './package-card'
import type { PackageProps } from './package-card'

interface PackageGridProps {
  packagecards: PackageProps[]
}

export default function PackageGrid({ packagecards }: PackageGridProps) {
  return (
    <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {packagecards.map((pkg, index) => (
        <div key={index} className='flex w-full justify-center'>
          <PackageCard {...pkg} />
        </div>
      ))}
    </div>
  )
}
