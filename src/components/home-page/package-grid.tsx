import PackageCard from '@/components/home-page/package-card'
import type { PackageProps } from '@/components/home-page/package-card'

interface PackageGridProps {
  packagecards: PackageProps[]
}

export default function PackageGrid({ packagecards }: PackageGridProps) {
  if (packagecards.length === 0) {
    return (
      <div className='mt-40 flex items-center justify-center text-lg font-medium'>
        No packages found
      </div>
    )
  }

  return (
    <div className='flex flex-wrap gap-4'>
      {packagecards.map((pkg, index) => (
        <PackageCard key={index} {...pkg} />
      ))}
    </div>
  )
}
