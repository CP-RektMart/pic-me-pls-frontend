import { PackageProps } from '@/components/home-page/package-card'

export const mockPackages: PackageProps[] = Array.from(
  { length: 12 },
  (_, index) => ({
    title: `Pre-wedding Outdoor ${index + 1}`,
    location: 'Hatyai, Songkhla',
    photographer: 'Chanatpakorn Sirintronsopon',
    price: '$1,200',
    imageUrl: '/image.png',
  })
)
