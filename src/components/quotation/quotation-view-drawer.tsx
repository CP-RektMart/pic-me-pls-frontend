import { useState } from 'react'

import { quotation } from '@/actions/get-quotations'
import { formatDateToString } from '@/lib/utils'
import { QuotationStatus } from '@/types/quotation'

import QuotationCard from '@/components/quotation/quotation-card'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import QuotationDetails from '../customer-quotation/details'
import { EditPackageForm } from '../photographer/package-page/edit-package'
import { CreateQuotationProps } from './photographer-quotation'
import QuotationFormDrawer from './quotation-form-drawer'

interface QuotationViewDrawerProps {
  setCurrentQuotation: (currentQuotation: quotation | null) => void
  setSelectedPackage: (selectedPackage: string) => void
  selectedPackage: string
  quotation: quotation
  onEditButtonClicked: () => void
  onSaveEditing: (data: CreateQuotationProps) => void
  packages: EditPackageForm[]
  setWindowstate: (windowstate: string) => void
  windowState: string
}

export default function QuotationViewDrawer({
  setCurrentQuotation,
  quotation,
  onEditButtonClicked,
  onSaveEditing,
  packages,
  setSelectedPackage,
  selectedPackage,
  setWindowstate,
  windowState,
}: QuotationViewDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setWindowstate('')
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
          duration={
            (new Date(quotation.to).getTime() -
              new Date(quotation.from).getTime()) /
            (1000 * 60 * 60)
          }
          totalPrice={
            quotation.pricePerHour *
            ((new Date(quotation.to).getTime() -
              new Date(quotation.from).getTime()) /
              (1000 * 60 * 60))
          }
          onClickEvent={() => {
            setWindowstate('')
            setCurrentQuotation(quotation)
            setIsOpen(true)
          }}
          className='block w-full lg:hidden'
        />
      </DrawerTrigger>

      <DrawerContent className='space-y-4 px-4 pb-10'>
        {/* header */}
        <DrawerHeader className='flex items-center justify-between space-y-4 px-4 py-0 text-2xl'>
          <DrawerTitle className='font-bold'>
            Quotation : {quotation.quotationID}
          </DrawerTitle>

          {quotation.status === 'Pending' && windowState !== 'edit' && (
            <Button
              onClick={() => {
                onEditButtonClicked()
              }}
              className='!mt-0'
            >
              Edit
            </Button>
          )}
        </DrawerHeader>

        {/* body */}
        {windowState === 'edit' && quotation.status === 'Pending' ? (
          <QuotationFormDrawer
            transactionType='edit'
            onSubmit={onSaveEditing}
            packages={packages}
            setSelectedPackage={setSelectedPackage}
            selectedPackage={selectedPackage}
            setIsOpen={setIsOpen}
          />
        ) : (
          <QuotationDetails
            quotationId={quotation.quotationID}
            quotationStatus={quotation?.status as QuotationStatus}
            packageName={quotation.packageName}
            photographerName={quotation.photographerName}
            customerName={quotation.customerName}
            from={formatDateToString(quotation.from)}
            to={formatDateToString(quotation.to)}
            description={quotation.description}
            duration={
              (new Date(quotation.to).getTime() -
                new Date(quotation.from).getTime()) /
              (1000 * 60 * 60)
            }
            totalPrice={
              quotation.pricePerHour *
              ((new Date(quotation.to).getTime() -
                new Date(quotation.from).getTime()) /
                (1000 * 60 * 60))
            }
          />
        )}
      </DrawerContent>
    </Drawer>
  )
}
