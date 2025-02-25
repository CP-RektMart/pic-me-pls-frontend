import QuotationPackageDetail from './quotation-package-detail'

export default function QuotationDetail() {
  return (
    <div className='w-full gap-6 px-4 py-2 lg:px-16 lg:py-4'>
      <div className='text-2xl font-bold'>Quotation</div>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <QuotationPackageDetail
          photographerName='Patthapol Kittikun'
          photographerPackageCounts={10}
          packageName='Package A'
          packageDescription='Lorem ipsum odor amet, consectetuer adipiscing elit. 
          Pharetra ante finibus fames tortor pellentesque fringilla placerat. 
          Curabitur urna donec tortor pulvinar pellentesque. 
          Potenti diam sapien nostra inceptos interdum ridiculus condimentum. 
          Magna dolor pellentesque pellentesque proin placerat. 
          Tristique interdum curae fames bibendum litora; 
          lobortis inceptos turpis.'
        />
      </div>
    </div>
  )
}
