'use client'

import { quotation } from '@/app/photographer/quotation/page'
import { QuotationStatus } from '@/types/quotation'

import QuotationDetails from '@/components/customer-quotation/details'
import { EditPackageForm } from '@/components/photographer/package-page/edit-package'
import { Button } from '@/components/ui/button'
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

import { CreateQuotationProps } from './photographer-quotation'
import QuotationFormDrawer from './quotation-form-drawer'

interface QuotationDrawerProps {
  isCreating: boolean
  setIsCreating: (isCreating: boolean) => void
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
  currentQuotation: quotation | null
  setCurrentQuotation: (currentQuotation: quotation | null) => void
  packages: EditPackageForm[]
  selectedPackage: string
  setSelectedPackage: (selectedPackage: string) => void
}

export function QuotationDrawer({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  currentQuotation,
  setCurrentQuotation,
  packages,
  selectedPackage,
  setSelectedPackage,
}: QuotationDrawerProps) {
  const onEditButtonClicked = () => {
    setIsEditing(true)
    setIsCreating(false)
  }

  const onSubmit = async (data: CreateQuotationProps) => {
    setIsCreating(false)
    setIsEditing(false)
    setCurrentQuotation(null)
    console.log(data)
  }

  const onSaveEditing = async (data: CreateQuotationProps) => {
    setIsCreating(false)
    setIsEditing(false)
    setCurrentQuotation(null)
    console.log(data)
  }

  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return new Date(`${month}/${day}/${year} ${hours}:${minutes}`)
  }

  return (
    <div className='lg:hidden'>
      <DrawerContent className='p-6 lg:hidden'>
        {isCreating ? (
          <div className='space-y-4 text-2xl font-bold lg:px-10'>
            Create Quotation
            <QuotationFormDrawer
              transactionType='create'
              onSubmit={onSubmit}
              packages={packages}
              setSelectedPackage={setSelectedPackage}
              selectedPackage={selectedPackage}
            />
          </div>
        ) : currentQuotation != null ? (
          isEditing ? (
            <div className='space-y-4 text-2xl font-bold lg:px-10'>
              <div className='w-full text-center'>
                Editing : {currentQuotation.quotationID}
              </div>

              <QuotationFormDrawer
                transactionType='edit'
                onSubmit={onSaveEditing}
                packages={packages}
                setSelectedPackage={setSelectedPackage}
                selectedPackage={selectedPackage}
              />
            </div>
          ) : (
            <div className='flex flex-col gap-4 space-y-4 text-2xl lg:px-10'>
              <div className='flex w-full flex-row justify-between font-bold'>
                {currentQuotation.quotationID}
                <Button onClick={onEditButtonClicked}>Edit</Button>
              </div>

              <QuotationDetails
                quotationId={currentQuotation.quotationID}
                quotationStatus={currentQuotation?.status as QuotationStatus}
                packageName={currentQuotation.packageName}
                photographerName={currentQuotation.photographerName}
                customerName={currentQuotation.customerName}
                from={formatDate(currentQuotation.from).toString()}
                to={formatDate(currentQuotation.to).toString()}
                description={currentQuotation.description}
                duration={
                  (new Date(currentQuotation.to).getTime() -
                    new Date(currentQuotation.from).getTime()) /
                  (1000 * 60 * 60)
                }
                totalPrice={
                  currentQuotation.pricePerHour *
                  ((new Date(currentQuotation.to).getTime() -
                    new Date(currentQuotation.from).getTime()) /
                    (1000 * 60 * 60))
                }
              />
            </div>
          )
        ) : null}
        <DrawerHeader className='lg:hidden'>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </div>
  )
}
