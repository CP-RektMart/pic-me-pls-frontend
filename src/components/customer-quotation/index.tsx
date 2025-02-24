import QuotationCarousel from '@/components/customer-quotation/carousel'
import QuotationDetails from '@/components/customer-quotation/details'

export default async function Page({ id }: { id: number }) {
  return (
    <div className='w-full p-4'>
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
      <QuotationCarousel />
    </div>
  )
}
