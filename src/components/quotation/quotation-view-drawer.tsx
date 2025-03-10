import { useState } from 'react'

import { quotation } from '@/app/photographer/quotation/page'
import { QuotationStatus } from '@/types/quotation'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

import QuotationDetails from '../customer-quotation/details'
import { formatDate } from './photographer-quotation'

interface ViewQuotationDrawerProps {
  setIsCreating: (isCreating: boolean) => void
  setIsEditing: (isEditing: boolean) => void
  setCurrentQuotation: (currentQuotation: quotation | null) => void
  setSelectedPackage: (selectedPackage: string) => void
  selectedPackage: string
  quotation: quotation
  onEditButtonClicked: () => void
}

export default function ViewQuotationDrawer({
  setIsCreating,
  setIsEditing,
  setCurrentQuotation,
  quotation,
  onEditButtonClicked,
}: ViewQuotationDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsCreating(false)
    setIsEditing(false)
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
      {/* to be replaced with card component */}
      <Button
        onClick={() => {
          setIsCreating(false)
          setCurrentQuotation(quotation)
          setIsOpen(true)
        }}
        className='w-full lg:hidden'
      >
        {quotation.quotationID}
      </Button>
      <DrawerContent className='p-6 lg:hidden'>
        <div className='space-y-4 text-2xl font-bold lg:px-10'>
          <div className='grid grid-cols-2 justify-between'>
            <div>{quotation.quotationID}</div>
            {quotation.status === 'Pending' ? (
              <div className='flex justify-end'>
                <Button
                  onClick={() => {
                    onEditButtonClicked()
                  }}
                  className='w-16 lg:block'
                >
                  Edit
                </Button>
              </div>
            ) : null}
          </div>

          <QuotationDetails
            quotationId={quotation.quotationID}
            quotationStatus={quotation?.status as QuotationStatus}
            packageName={quotation.packageName}
            photographerName={quotation.photographerName}
            customerName={quotation.customerName}
            from={formatDate(quotation.from).toString()}
            to={formatDate(quotation.to).toString()}
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
        </div>
        <DrawerHeader className='lg:hidden'>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}
