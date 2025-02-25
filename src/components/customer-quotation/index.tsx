import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import QuotationCarousel from '@/components/customer-quotation/carousel'
import QuotationDetails from '@/components/customer-quotation/details'
import ProfileHeader from '@/components/customer-quotation/profile-header'

const images = [
  {
    url: 'https://thedaily.case.edu/wp-content/uploads/2023/06/underwater-view.jpg',
    name: 'Ocean',
  },
  {
    url: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Forrest',
  },
  {
    url: 'https://www.allaboutbirds.org/news/wp-content/uploads/2024/05/549985061-Rufous_Hummingbird-Nathan_Wall.jpg',
    name: 'Hummingbird',
  },
  {
    url: 'https://media.newyorker.com/photos/660fe3deaba0b51c65382288/master/w_2240,c_limit/Galchen-Eclipse.jpg',
    name: 'Solar Eclipse',
  },
  {
    url: 'https://media.istockphoto.com/id/1224025134/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A2%E0%B8%B0%E0%B9%83%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B9%80%E0%B8%95%E0%B9%87%E0%B8%81%E0%B8%99%E0%B8%B4%E0%B8%A7%E0%B8%A2%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%81.jpg?s=1024x1024&w=is&k=20&c=r52awidhEO6DXvup515015SCZxavSK2Q-G7OExsLRMU=',
    name: 'Steak',
  },
]

const mockData = {
  status: 'Pending',
  packageName: 'Package A',
  photographerName: 'Chanatpakorn S.',
  customerName: 'Chanotai K.',
  from: '20/02/2025 14:00',
  to: '20/02/2025 19:00',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas augue tortor, luctus eget laoreet et, interdum fringilla urna. ',
  duration: 5,
  totalPrice: 2000,
}

export default async function Page({ id }: { id: number }) {
  const session = await auth()

  if (!session || !session.user) {
    redirect(`/login`)
  }

  return (
    <div className='mx-auto p-4 lg:py-0'>
      <p className='mb-6 hidden text-2xl font-bold lg:block'>Quotation</p>
      <div className='mx-auto flex flex-col justify-between gap-4 lg:flex-row lg:gap-6'>
        <div className='flex flex-col'>
          <ProfileHeader
            imageUrl={session.user.image}
            name={session.user.name}
            galleriesNumber={999}
          />

          {/* package details */}
          <div className='hidden lg:block'>
            <p className='text-xl font-bold'>{mockData.packageName}</p>
            <p className='mt-2 text-sm'>{mockData.description}</p>
          </div>
          <QuotationCarousel images={images} />
        </div>

        <QuotationDetails
          quotationId={id}
          status={mockData.status}
          packageName={mockData.packageName}
          photographerName={mockData.photographerName}
          customerName={mockData.customerName}
          from={mockData.from}
          to={mockData.to}
          description={mockData.description}
          duration={mockData.duration}
          totalPrice={mockData.totalPrice}
        />
      </div>
    </div>
  )
}
