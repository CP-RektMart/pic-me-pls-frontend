import QuotationCarousel from '@/components/customer-quotation/carousel'
import QuotationDetails from '@/components/customer-quotation/details'

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
]

export default async function Page({ id }: { id: number }) {
  return (
    <div className='mx-auto p-4'>
      <div className='mx-auto flex flex-row justify-between gap-6'>
        <div className='flex flex-col gap-6 p-6'>
          <div>Photographer profile</div>
          <div>Package description</div>
          <QuotationCarousel images={images} />
        </div>
        <QuotationDetails
          quotationId={id}
          status='Paid'
          packageName='Package A'
          photographerName='Chanatpakorn S.'
          customerName='Chanotai K.'
          from='20/02/2025 14:00'
          to='20/02/2025 19:00'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas augue tortor, luctus eget laoreet et, interdum fringilla urna. '
          duration={5}
          totalPrice={2000}
        />
      </div>
    </div>
  )
}
