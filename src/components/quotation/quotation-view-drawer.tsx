import { useState } from 'react'

import { quotation } from '@/app/photographer/quotation/page'
import { formatDateToString } from '@/lib/utils'
import { QuotationStatus } from '@/types/quotation'

import Container from '@/components/container'
import QuotationCard from '@/components/quotation/quotation-card'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

import QuotationDetails from '../customer-quotation/details'
import { EditPackageForm } from '../photographer/package-page/edit-package'
import { CreateQuotationProps } from './photographer-quotation'
import QuotationFormDrawer from './quotation-form-drawer'

interface ViewQuotationDrawerProps {
  setIsCreating: (isCreating: boolean) => void
  setIsEditing: (isEditing: boolean) => void
  setCurrentQuotation: (currentQuotation: quotation | null) => void
  setSelectedPackage: (selectedPackage: string) => void
  selectedPackage: string
  quotation: quotation
  onEditButtonClicked: () => void
  isEditing: boolean
  onSaveEditing: (data: CreateQuotationProps) => void
  packages: EditPackageForm[]
}

export default function ViewQuotationDrawer({
  setIsCreating,
  setIsEditing,
  setCurrentQuotation,
  quotation,
  onEditButtonClicked,
  isEditing,
  onSaveEditing,
  packages,
  setSelectedPackage,
  selectedPackage,
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
          setIsCreating(false)
          setCurrentQuotation(quotation)
          setIsOpen(true)
        }}
        className='block w-full lg:hidden'
      />
      <DrawerContent className='py-6 lg:hidden'>
        <Container>
          {isEditing ? (
            <div className='space-y-4 text-2xl lg:px-10'>
              <div className='w-full text-center font-bold'>
                Editing : {quotation.quotationID}
              </div>

              <QuotationFormDrawer
                transactionType='edit'
                onSubmit={onSaveEditing}
                packages={packages}
                setSelectedPackage={setSelectedPackage}
                selectedPackage={selectedPackage}
                setIsOpen={setIsOpen}
              />
            </div>
          ) : (
            <div className='space-y-4 text-2xl lg:px-10'>
              <div className='grid grid-cols-2 justify-between font-bold'>
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
            </div>
          )}

          <DrawerHeader className='lg:hidden'>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
        </Container>
      </DrawerContent>
    </Drawer>
  )
}
