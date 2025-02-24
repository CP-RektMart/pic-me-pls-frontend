import QuotationCarousel from '@/components/customer-quotation/carousel'
import QuotationDetails from '@/components/customer-quotation/details'

export default async function Page({ id }: { id: number }) {
  return (
    <div>
      Quotation id: {id}
      <QuotationDetails />
      <QuotationCarousel />
    </div>
  )
}
