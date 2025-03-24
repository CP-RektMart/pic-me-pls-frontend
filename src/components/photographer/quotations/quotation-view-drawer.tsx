import { useState } from 'react'

import { Package } from '@/actions/photographer/package/get-packages'
import { Quotation } from '@/actions/quotation/get-quotations'
import { calculateDurationFromDate } from '@/lib/utils'
import { formatDateToString } from '@/lib/utils'
import { QuotationStatus, WindowState } from '@/types/quotation'

import QuotationCard from '@/components/quotation/quotation-card'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { QuotationDetails } from '../../quotation/quotation-details'
import { CreateQuotationForm } from './photographer-quotation'
import { PreviewView } from './preview-view'
import QuotationFormDrawer from './quotation-form-drawer'

interface QuotationViewDrawerProps {
  setCurrentQuotation: (currentQuotation: Quotation | null) => void
  setSelectedPackageId: (selectedPackageId: string) => void
  selectedPackageId: string
  quotation: Quotation
  onEditButtonClicked: () => void
  onSaveEditing: (data: CreateQuotationForm) => void
  packages: Package[]
  setWindowstate: (windowstate: WindowState) => void
  windowState: WindowState
}

export default function QuotationViewDrawer({
  setCurrentQuotation,
  quotation,
  onEditButtonClicked,
  onSaveEditing,
  packages,
  setSelectedPackageId,
  selectedPackageId,
  setWindowstate,
  windowState,
}: QuotationViewDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const onClose = () => {
    setWindowstate(null)
    setCurrentQuotation(null)
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) onClose()
      }}
    >
      <DrawerTrigger asChild>
        <QuotationCard
          quotationId={quotation.quotationID}
          quotationStatus={quotation.status as QuotationStatus}
          packageName={quotation.packageName}
          photographerName={quotation.photographerName}
          customerName={quotation.customerName}
          from={formatDateToString(quotation.from).toString()}
          to={formatDateToString(quotation.to).toString()}
          description={quotation.description}
          duration={calculateDurationFromDate(quotation.from, quotation.to)}
          totalPrice={quotation.price}
          onClickEvent={() => {
            setWindowstate(null)
            setCurrentQuotation(quotation)
            setIsOpen(true)
          }}
          className='block w-full lg:hidden'
        />
      </DrawerTrigger>

      <DrawerContent className='space-y-4 px-4 pb-10'>
        {/* header */}
        <DrawerHeader className='flex items-center justify-between space-y-4 px-4 py-0'>
          <DrawerTitle className='text-xl font-bold'>
            Quotation {quotation.quotationID}
          </DrawerTitle>

          {quotation.status === 'PENDING' && windowState !== 'edit' && (
            <Button
              onClick={() => {
                onEditButtonClicked()
              }}
              className='!mt-0'
            >
              Edit
            </Button>
          )}
          {windowState === 'edit' && quotation.status === 'PENDING' && (
            <Button onClick={onClose} className='!mt-0'>
              Close
            </Button>
          )}
        </DrawerHeader>

        {/* body */}
        {windowState === 'edit' && quotation.status === 'PENDING' ? (
          <QuotationFormDrawer
            transactionType='edit'
            onSubmit={onSaveEditing}
            packages={packages}
            setSelectedPackageId={setSelectedPackageId}
            selectedPackageId={selectedPackageId}
            setIsOpen={setIsOpen}
            fromDate={quotation.from}
            toDate={quotation.to}
            description={quotation.description}
            customerId={quotation.customerId.toString()}
          />
        ) : (
          <div>
            <QuotationDetails
              quotationId={quotation.quotationID}
              quotationStatus={quotation?.status as QuotationStatus}
              packageName={quotation.packageName}
              photographerName={quotation.photographerName}
              customerName={quotation.customerName}
              from={formatDateToString(quotation.from)}
              to={formatDateToString(quotation.to)}
              description={quotation.description}
              duration={calculateDurationFromDate(quotation.from, quotation.to)}
              totalPrice={quotation.price}
            />
            {showPreview && <PreviewView quotationId={quotation.quotationID} />}
            {/* View More Button */}
            <Button
              onClick={() => setShowPreview(!showPreview)}
              className='mt-4 text-sm'
            >
              {showPreview ? 'View Less' : 'View More'}
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
