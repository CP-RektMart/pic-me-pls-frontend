import { quotations } from '@/actions/get-quotations'

import { EditPackageForm } from '@/components/photographer/package-page/edit-package'
import PhotographerQuotation from '@/components/quotation/photographer-quotation'

const packages: EditPackageForm[] = [
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
