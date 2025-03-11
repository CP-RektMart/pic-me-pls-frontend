'use client'

import { useState } from 'react'

import { Package } from '@/actions/get-packages'
import { quotation } from '@/actions/get-quotations'
// import  createQuotationAction  from '@/actions/create-quotation'
import { formatDateToString } from '@/lib/utils'
import { QuotationStatus, WindowState } from '@/types/quotation'
import { Icon } from '@iconify/react'
import z from 'zod'

import QuotationDetails from '@/components/customer-quotation/details'
import { Button } from '@/components/ui/button'

import Container from '../container'
import QuotationCard from './quotation-card'
import CreateQuotationDrawer from './quotation-create-drawer'
import QuotationForm from './quotation-form'
import QuotationViewDrawer from './quotation-view-drawer'

export interface PhotographerQuotationProps {
  quotations: quotation[]
  packages: Package[]
}

export interface CreateQuotationProps {
  packageId: string
  customerId: string
  price: number
  from: Date
  to: Date
  description: string
}

export const createQuotationFormSchema = z.object({
  packageId: z.string(),
  customerId: z.string(),
  from: z.date(),
  to: z.date(),
  description: z.string().min(2, 'Description must be at least 2 characters'),
})

export type CreateQuotationForm = z.infer<typeof createQuotationFormSchema>

export default function PhotographerQuotation({
  quotations,
  packages,
}: PhotographerQuotationProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('')

  const [windowState, setWindowstate] = useState<WindowState>(null)
  const [currentQuotation, setCurrentQuotation] = useState<quotation | null>(
    null
  )

  const onCreateQuotationButtonClicked = () => {
    setWindowstate('create')
  }

  const onEditButtonClicked = () => {
    setWindowstate('edit')
  }

  const onSubmit = async (data: CreateQuotationProps) => {
    console.log('test')
    console.log(data)
    setWindowstate(null)
    setCurrentQuotation(null)
  }

  const onSaveEditing = async (data: CreateQuotationProps) => {
    console.log('test')
    console.log(data)
    setWindowstate(null)
    setCurrentQuotation(null)
  }

  return (
    <Container className='space-y-6 py-4 lg:py-6'>
      <div className='flex flex-row justify-between'>
        <div className='text-2xl font-bold'>Quotation Manager</div>

        {/* Desktop */}
        <Button
          onClick={onCreateQuotationButtonClicked}
          className='hidden lg:block'
        >
          New Quotation
        </Button>

        {/* Mobile */}
        <CreateQuotationDrawer
          setWindowstate={setWindowstate}
          setCurrentQuotation={setCurrentQuotation}
          onSubmit={onSubmit}
          packages={packages}
          selectedPackageId={selectedPackageId}
          setSelectedPackageId={setSelectedPackageId}
        />
      </div>

      {quotations.length == 0 && !windowState ? (
        <div className='text-medium flex h-[69vh] flex-col place-content-center items-center justify-center gap-3 font-medium text-gray-500'>
          <Icon icon='lucide:sticky-note' className='h-20 w-12 text-gray-500' />
          <span>You don&apos;t have any quotations yet</span>
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
              <div className='flex flex-col gap-4 font-normal'>
                {quotations.map((quotation) => (
                  <div key={quotation.quotationID}>
                    <QuotationViewDrawer
                      windowState={windowState}
                      setWindowstate={setWindowstate}
                      setCurrentQuotation={setCurrentQuotation}
                      quotation={quotation}
                      setSelectedPackageId={setSelectedPackageId}
                      selectedPackageId={selectedPackageId}
                      onEditButtonClicked={onEditButtonClicked}
                      onSaveEditing={onSaveEditing}
                      packages={packages}
                    />
                    <QuotationCard
                      quotationId={quotation.quotationID}
                      quotationStatus={quotation.status as QuotationStatus}
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
                      onClickEvent={() => {
                        setCurrentQuotation(quotation)
                        setWindowstate(null)
                      }}
                      className='hidden w-full lg:block'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='hidden lg:block'>
            {windowState === 'create' ? (
              <div className='px-10'>
                <div className='space-y-4 text-2xl font-bold'>
                  Create Quotation
                </div>
                <QuotationForm
                  transactionType='create'
                  packages={packages}
                  onSubmit={onSubmit}
                  setSelectedPackageId={setSelectedPackageId}
                  selectedPackageId={selectedPackageId}
                />
              </div>
            ) : currentQuotation != null ? (
              windowState === 'edit' &&
              currentQuotation.status === 'Pending' ? (
                <div className='space-y-4 text-2xl font-bold lg:px-10'>
                  <div>Quotation : {currentQuotation.quotationID}</div>

                  <QuotationForm
                    transactionType='Edit'
                    packages={packages}
                    onSubmit={onSaveEditing}
                    setSelectedPackageId={setSelectedPackageId}
                    selectedPackageId={selectedPackageId}
                  />
                </div>
              ) : (
                <div className='flex flex-col gap-4 space-y-4 text-2xl lg:px-10'>
                  <div className='flex w-full flex-row justify-between font-bold'>
                    <div>Quotation : {currentQuotation.quotationID}</div>
                    {currentQuotation.status == 'Pending' ? (
                      <Button onClick={onEditButtonClicked}>Edit</Button>
                    ) : null}
                  </div>

                  <QuotationDetails
                    quotationId={currentQuotation.quotationID}
                    quotationStatus={
                      currentQuotation?.status as QuotationStatus
                    }
                    packageName={currentQuotation.packageName}
                    photographerName={currentQuotation.photographerName}
                    customerName={currentQuotation.customerName}
                    from={formatDateToString(currentQuotation.from)}
                    to={formatDateToString(currentQuotation.to)}
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
        </div>
      )}
    </Container>
  )
}
