'use client'

import { useState } from 'react'

import { quotation } from '@/app/photographer/quotation/page'
import { QuotationStatus } from '@/types/quotation'
import { Icon } from '@iconify/react'
import z from 'zod'

import QuotationDetails from '@/components/customer-quotation/details'
import { EditPackageForm } from '@/components/photographer/package-page/edit-package'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'

import { QuotationDrawer } from './quotation-drawer'
import QuotationForm from './quotation-form'

export interface PhotographerQuotationProps {
  quotations: quotation[]
  packages: EditPackageForm[]
}

export interface CreateQuotationProps {
  package: string
  customer: string
  from: Date
  to: Date
  description: string
}

export const createQuotationFormSchema = z.object({
  package: z.string().min(2, 'Gallery must be at least 2 characters'),
  customer: z.string().min(2, 'Customer must be at least 2 characters'),
  from: z.date(),
  to: z.date(),
  description: z.string().min(2, 'Description must be at least 2 characters'),
})

export type CreateQuotationForm = z.infer<typeof createQuotationFormSchema>

export default function PhotographerQuotation({
  quotations,
  packages,
}: PhotographerQuotationProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>('')

  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [currentQuotation, setCurrentQuotation] = useState<quotation | null>(
    null
  )
  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const onClose = () => {
    setIsCreating(false)
    setIsEditing(false)
    setCurrentQuotation(null)
  }

  const onCreateQuotationButtonClicked = () => {
    setIsCreating(true)
    setIsEditing(false)
  }

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

  return (
    <div className='size-full space-y-6'>
      <Drawer onOpenChange={(open) => !open && onClose?.()}>
        <div className='flex flex-row justify-between'>
          <div className='text-2xl font-bold'>Quotation Manager</div>

          <Button
            onClick={onCreateQuotationButtonClicked}
            className='hidden lg:block'
          >
            New Quotation
          </Button>
          <DrawerTrigger asChild>
            <Button
              onClick={onCreateQuotationButtonClicked}
              className='lg:hidden'
            >
              <Icon icon='lucide:plus' />
            </Button>
          </DrawerTrigger>
        </div>
        {quotations.length == 0 && !isCreating && !isEditing ? (
          <div className='flex h-full flex-col items-center justify-center gap-3'>
            <Icon icon='lucide:sticky-note' className='size-20' />
            No Quotations To Show
          </div>
        ) : (
          <div className='grid h-full grid-cols-1 gap-6 lg:grid-cols-2'>
            <div className='gap-2.5 space-y-2.5 text-2xl font-bold lg:px-10'>
              <div>Latest Quotations</div>

              {quotations.length == 0 ? (
                <div className='flex h-full flex-col items-center justify-center gap-3'>
                  <Icon icon='lucide:sticky-note' className='size-20' />
                  No Quotations To Show
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  {quotations.map((quotation) => (
                    //to be replaced with card component
                    <div key={quotation.quotationID}>
                      <DrawerTrigger asChild>
                        <Button
                          onClick={() => {
                            setIsCreating(false)
                            setCurrentQuotation(quotation)
                          }}
                          className='w-full lg:hidden'
                        >
                          {quotation.quotationID}
                        </Button>
                      </DrawerTrigger>
                      <Button
                        onClick={() => {
                          setIsCreating(false)
                          setCurrentQuotation(quotation)
                        }}
                        className='hidden w-full lg:block'
                      >
                        {quotation.quotationID}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* right side of lg, drawer in mobile */}
            <div className='hidden lg:block'>
              {isCreating ? (
                <div className='space-y-4 text-2xl font-bold lg:px-10'>
                  Create Quotation
                  <QuotationForm
                    transactionType='Create'
                    packages={packages}
                    onSubmit={onSubmit}
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

                    <QuotationForm
                      transactionType='Edit'
                      packages={packages}
                      onSubmit={onSaveEditing}
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
                      quotationStatus={
                        currentQuotation?.status as QuotationStatus
                      }
                      packageName={currentQuotation.packageName}
                      photographerName={currentQuotation.photographerName}
                      customerName={currentQuotation.customerName}
                      from={formatDate(currentQuotation.from)}
                      to={formatDate(currentQuotation.to)}
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
            </div>
            {/* end of lg case */}

            <QuotationDrawer
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              currentQuotation={currentQuotation}
              setCurrentQuotation={setCurrentQuotation}
              packages={packages}
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
            />
          </div>
        )}
      </Drawer>
    </div>
  )
}
