import { PackageForm } from '@/components/package-page/create-package'
import PhotographerQuotation from '@/components/quotation/photographer-quotation'

export interface quotation {
  quotationID: string
  status: string
  packageName: string
  photographerName: string
  customerName: string
  from: Date
  to: Date
  description: string
  pricePerHour: number
}

const quotations: quotation[] = [
  {
    quotationID: 'Q0001',
    status: 'Pending',
    packageName: 'Wedding Package',
    photographerName: 'John Doe',
    customerName: 'Jane Doe',
    from: new Date('2022-01-01 08:00'),
    to: new Date('2022-01-02 08:00'),
    description: 'Wedding photography package',
    pricePerHour: 400,
  },
  {
    quotationID: 'Q0002',
    status: 'Confirmed',
    packageName: 'Birthday Package',
    photographerName: 'John Doe',
    customerName: 'Jane Doe',
    from: new Date('2022-01-01 08:00'),
    to: new Date('2022-01-02 08:00'),
    description: 'Birthday photography package',
    pricePerHour: 300,
  },
  {
    quotationID: 'Q0003',
    status: 'Paid',
    packageName: 'Graduation Package',
    photographerName: 'John Doe',
    customerName: 'Jane Doe',
    from: new Date('2022-01-01 08:00'),
    to: new Date('2022-01-02 08:00'),
    description: 'Graduation photography package',
    pricePerHour: 200,
  },
  {
    quotationID: 'Q0004',
    status: 'Cancelled',
    packageName: 'Wedding Package',
    photographerName: 'John Doe',
    customerName: 'Jane Doe',
    from: new Date('2022-01-01 08:00'),
    to: new Date('2022-01-02 08:00'),
    description: 'Wedding photography package',
    pricePerHour: 400,
  },
]

const packages: PackageForm[] = [
  {
    name: 'Wedding Package',
    packageDescription: 'Wedding photography package',
    price: 400,
  },
  {
    name: 'Birthday Package',
    packageDescription: 'Birthday photography package',
    price: 300,
  },
  {
    name: 'Graduation Package',
    packageDescription: 'Graduation photography package',
    price: 200,
  },
]

export default function QuotationPage() {
  return (
    <div className='flex w-full flex-col gap-6 px-4 py-4 lg:px-32'>
      <PhotographerQuotation quotations={quotations} packages={packages} />
    </div>
  )
}
