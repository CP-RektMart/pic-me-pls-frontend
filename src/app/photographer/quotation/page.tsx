import { EditPackageForm } from '@/components/photographer/package-page/edit-package'
import PhotographerQuotation from '@/components/quotation/photographer-quotation'

import { client } from '@/api/client'

export interface quotation {
  quotationID: number
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
    quotationID: 1,
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
    quotationID: 2,
    status: 'Confirm',
    packageName: 'Birthday Package',
    photographerName: 'John Doe',
    customerName: 'Jane Doe',
    from: new Date('2022-01-01 08:00'),
    to: new Date('2022-01-02 08:00'),
    description: 'Birthday photography package',
    pricePerHour: 300,
  },
  {
    quotationID: 3,
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
    quotationID: 4,
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

export default async function QuotationPage() {
  const { data: user } =
    await client.GET('/api/v1/me')

  // TODO: user?.result?.id is userId not photographerId 
  
  const { data } = await client.GET('/api/v1/packages', {
    params: {
      query: {
        photographerId:  1 // where photographerId !!!
      },
    },
  })

  const packages = data?.data?.map((pkg: any) => ({
    name: pkg.name,
    packageDescription: pkg.description,
    price: pkg.price,
  })) || []

  return (
    <div className='flex w-full flex-col gap-6 px-4 py-4 lg:px-32'>
      <PhotographerQuotation quotations={quotations} packages={packages} />
    </div>
  )
}
