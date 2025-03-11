import { PackageProps } from './package-card'
import PackageGrid from './package-grid'

// 10 of mock
const mockPackages: PackageProps[] = Array.from({ length: 6 }, (_, index) => ({
  title: `Pre-wedding Outdoor ${index + 1}`,
  location: 'Hatyai, Songkhla',
  photographer: 'Chanatpakorn Sirintronsopon',
  price: '$1,200',
  imageUrl: 'image.png',
}))

export default function HomePageComponent() {
  return (
    <div className='mx-8 my-6 flex justify-center px-4'>
      <PackageGrid packagecards={mockPackages} />
    </div>
  )
}
