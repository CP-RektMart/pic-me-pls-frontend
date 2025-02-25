interface QuotationDetailSectionProps {
  quotationID: string
  status: string
  packageName: string
  photographerName: string
  customerName: string
  from: string
  to: string
  description: string
  duration: string
  totalPrice: number
}

export default function QuotationDetailSection({
  quotationID,
  status,
  packageName,
  photographerName,
  customerName,
  from,
  to,
  description,
  duration,
  totalPrice,
}: QuotationDetailSectionProps) {
  let statusColour

  switch (status) {
    case 'Pending':
      statusColour = 'text-amber-700'
      break
    case 'Confirmed':
      statusColour = 'text-sky-700'
      break
    case 'Paid':
      statusColour = 'text-emerald-700'
      break
    default:
      statusColour = 'text-red-700'
  }

  return (
    <div className='flex flex-col gap-4 px-4 lg:px-20'>
      <div className='flex flex-row justify-between text-sm font-normal'>
        <div>Quotation ID</div>
        <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
          {quotationID}
        </div>
      </div>

      <hr className='border border-gray-200' />

      <div className='flex flex-row justify-between text-sm font-normal'>
        <div>Status</div>
        <div
          className={`max-h-24 max-w-48 overflow-hidden text-ellipsis text-right ${statusColour}`}
        >
          {status}
        </div>
      </div>

      <hr className='border border-gray-200' />

      <div className='flex flex-row justify-between text-sm font-normal'>
        <div>Package Name</div>
        <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
          {packageName}
        </div>
      </div>

      <hr className='border border-gray-200' />

      <div className='flex flex-row justify-between text-sm font-normal'>
        <div>Photographer Name</div>
        <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
          {photographerName}
        </div>
      </div>

      <hr className='border border-gray-200' />

      <div className='flex flex-row justify-between text-sm font-normal'>
        <div>Customer Name</div>
        <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
          {customerName}
        </div>
      </div>

      <hr className='border border-gray-200' />

      <div className='flex flex-row justify-between text-sm font-normal'>
        <div>From</div>
        <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
          {from}
        </div>
      </div>

      <hr className='border border-gray-200' />

      <div className='flex flex-row justify-between text-sm font-normal'>
        <div>To</div>
        <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
          {to}
        </div>
      </div>

      <hr className='border border-gray-200' />

      <div className='flex flex-row justify-between text-sm font-normal'>
        <div>Description</div>
        <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
          {description}
        </div>
      </div>

      <hr className='border border-gray-200' />

      <div className='flex flex-row justify-between text-sm font-normal'>
        <div>Duration</div>
        <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
          {duration}
        </div>
      </div>

      <hr className='border border-gray-200' />

      <div className='flex flex-row justify-between text-sm font-normal'>
        <div>Total Price</div>
        <div className='max-h-24 max-w-48 overflow-hidden text-ellipsis text-right'>
          {totalPrice} Baht
        </div>
      </div>
    </div>
  )
}
