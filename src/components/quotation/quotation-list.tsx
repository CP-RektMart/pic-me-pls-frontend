import { Quotation } from '@/actions/quotation/get-quotations'
import { calculateDurationFromDate, formatDateToString } from '@/lib/utils'
import { QuotationStatus } from '@/types/quotation'
import Link from 'next/link'

import { Container } from '@/components/container'
import QuotationCard from '@/components/quotation/quotation-card'

interface QuotationListProps {
  quotations: Quotation[]
}

export function QuotationList({ quotations }: QuotationListProps) {
  return (
    <Container className='py-6'>
      <h1 className='mb-6 text-2xl font-bold'>My Quotation</h1>
      <div className='grid grid-cols-1 place-content-center gap-6 md:flex-row md:flex-wrap lg:grid-cols-2 xl:grid-cols-3'>
        {quotations.map((quotation) => (
          <Link
            key={quotation.quotationID}
            href={`/quotation/${quotation.quotationID}`}
          >
            <QuotationCard
              className='min-h-44 md:min-w-96'
              quotationId={quotation.quotationID}
              quotationStatus={quotation.status as QuotationStatus}
              packageName={quotation.packageName}
              photographerName={quotation.photographerName}
              customerName={quotation.customerName}
              from={formatDateToString(quotation.from)}
              photographerImageUrl={quotation.photographerPictureUrl}
              to={formatDateToString(quotation.to)}
              description={quotation.description}
              duration={calculateDurationFromDate(quotation.from, quotation.to)}
              totalPrice={quotation.price}
            />
          </Link>
        ))}
      </div>
    </Container>
  )
}
