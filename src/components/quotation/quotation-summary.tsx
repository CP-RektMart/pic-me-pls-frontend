import { Package } from '@/actions/get-packages'

interface QuotationSummaryProps {
  totalHours: number
  selectedPackage: string
  packages: Package[]
}

export default function QuotationSummary({
  packages,
  totalHours,
  selectedPackage,
}: QuotationSummaryProps) {
  return (
    <div className='flex flex-col gap-2 p-4 text-sm font-normal'>
      <div className='flex flex-row justify-between'>
        <div>Total hours</div>
        <div>{totalHours > 0 ? totalHours.toFixed(0) : 0} Hours</div>
      </div>

      <div className='flex flex-row justify-between'>
        <div>Price Per Hour</div>
        <div>
          {packages.find((pkg) => pkg.name === selectedPackage)?.price ?? 0}{' '}
          Baht
        </div>
      </div>

      <div className='flex flex-row justify-between text-base font-bold'>
        <div>Total Price</div>
        <div>
          {((packages.find((pkg) => pkg.name === selectedPackage)?.price ??
            0) ||
            0) * totalHours}{' '}
          Baht
        </div>
      </div>
    </div>
  )
}
