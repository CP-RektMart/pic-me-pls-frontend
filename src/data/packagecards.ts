import { PackageProps } from '@/components/home-page/package-card'

export const mockPackages: PackageProps[] = Array.from(
  { length: 12 },
  (_, index) => ({
    title: `ทะเลหาดใหย่ ${index + 1}`,
    location: 'Hatyai, Songkhla',
    photographer: 'Chanatpakorn Sirintronsopon',
    price: '$1,200',
    category: 'Beach',
    imageUrl:
      'https://thedaily.case.edu/wp-content/uploads/2023/06/underwater-view.jpg',
  })
)
