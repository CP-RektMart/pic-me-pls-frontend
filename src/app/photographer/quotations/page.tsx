import { getQuotations } from '@/actions/get-quotations'

import PhotographerQuotation from '@/components/quotation/photographer-quotation'

export interface Package {
  name: string
  packageDescription: string
  price: number
}

const tmpPackages: Package[] = [
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
  const quotations = getQuotations()
  // const packages = getPackages()

  return (
    <PhotographerQuotation quotations={quotations} packages={tmpPackages} />
  )
}
