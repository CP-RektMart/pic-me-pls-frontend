import QuotationDetailSection from './quotation-detail-section'
import QuotationPackageDetail from './quotation-package-detail'

export default function QuotationDetail() {
  return (
    <div className='w-full gap-6 px-4 py-6 lg:px-16'>
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
        <QuotationDetailSection
          quotationID='QT123456789'
          status='Pending'
          packageName='Package A'
          photographerName='Patthapol Kittikun'
          customerName='Chanatpakorn Sirintornsophon'
          from='20/02/2025 14:00'
          to='20/02/2025 19:00'
          description='Lorem ipsum odor amet, consectetuer adipiscing elit.
          Pharetra ante finibus fames tortor pellentesque fringilla placerat.
          Curabitur urna donec tortor pulvinar pellentesque.
          Potenti diam sapien nostra inceptos interdum ridiculus condimentum.
          Magna dolor pellentesque pellentesque proin placerat.
          Tristique interdum curae fames bibendum litora;
          lobortis inceptos turpis.'
          duration='5 Hours'
          totalPrice={2000}
        />
      </div>
    </div>
  )
}
