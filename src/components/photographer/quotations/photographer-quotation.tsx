'use client'

import { useState } from 'react'

import { Package } from '@/actions/photographer/package/get-packages'
import createQuotationAction from '@/actions/quotation/create-quotation'
import { Quotation } from '@/actions/quotation/get-quotations'
import updateQuotationAction from '@/actions/quotation/update-quotation'
import { calculateDurationFromDate } from '@/lib/utils'
import { formatDateToString } from '@/lib/utils'
import { QuotationStatus, WindowState } from '@/types/quotation'
import { Icon } from '@iconify/react'
import { toast } from 'sonner'
import z from 'zod'

import { QuotationDetails } from '@/components/quotation/quotation-details'
import { Button } from '@/components/ui/button'

import { Container } from '../../container'
import QuotationCard from '../../quotation/quotation-card'
import { PreviewView } from './preview-view'
import CreateQuotationDrawer from './quotation-create-drawer'
import QuotationForm from './quotation-form'
import QuotationViewDrawer from './quotation-view-drawer'

export interface PhotographerQuotationProps {
  quotations: Quotation[]
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
  price: z.number(),
})

export type CreateQuotationForm = z.infer<typeof createQuotationFormSchema>

export default function PhotographerQuotation({
  quotations,
  packages,
}: PhotographerQuotationProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('')

  const [windowState, setWindowstate] = useState<WindowState>(null)
  const [currentQuotation, setCurrentQuotation] = useState<Quotation | null>(
    null
  )

  const onCreateQuotationButtonClicked = () => {
    setWindowstate('create')
  }

  const onEditButtonClicked = () => {
    setWindowstate('edit')
  }

  const onClose = () => {
    setWindowstate(null)
  }

  const onSubmit = async (data: CreateQuotationForm) => {
    try {
      await createQuotationAction(data)
      toast.success('Your quotation has been successfully created.')
    } catch {
      toast.error('An error occurred while create your quotation')
    }

    setWindowstate(null)
    setCurrentQuotation(null)
  }

  const onSaveEditing = async (data: CreateQuotationForm) => {
    try {
      if (currentQuotation?.quotationID !== undefined) {
        await updateQuotationAction(currentQuotation.quotationID, data)
      } else {
        toast.error('Quotation ID is missing.')
      }
      toast.success('Your quotation has been successfully updated.')
    } catch {
      toast.error('An error occurred while updated your quotation')
    }

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
        <div className='text-medium flex flex-col place-content-center items-center justify-center gap-3 font-medium text-gray-500'>
          <Icon icon='lucide:sticky-note' className='h-20 w-12 text-gray-500' />
          <span>You don&apos;t have any quotations yet</span>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <div className='min-h-[400px] gap-2.5 space-y-2 rounded-lg border border-gray-200 bg-white px-4 py-4 text-lg font-bold shadow-md sm:min-h-[500px] sm:px-6 sm:py-5 sm:text-xl md:min-h-[600px] md:text-2xl lg:px-10 lg:py-6 lg:shadow-lg'>
            <div className='mb-8'>Latest Quotations</div>

            {quotations.length == 0 ? (
              <div className='flex flex-col items-center justify-center gap-3'>
                <Icon icon='lucide:sticky-note' className='size-20' />
                No Quotations To Show
              </div>
            ) : (
              <div className='flex flex-col gap-4 font-normal'>
                {quotations.map((quotation) => (
                  <div key={quotation.quotationID}>
                    {/* Mobile */}
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

                    {/* Desktop */}
                    <QuotationCard
                      quotationId={quotation.quotationID}
                      quotationStatus={quotation.status as QuotationStatus}
                      packageName={quotation.packageName}
                      photographerName={quotation.photographerName}
                      customerName={quotation.customerName}
                      from={formatDateToString(quotation.from)}
                      to={formatDateToString(quotation.to)}
                      description={quotation.description}
                      duration={calculateDurationFromDate(
                        quotation.from,
                        quotation.to
                      )}
                      totalPrice={quotation.price}
                      onClickEvent={() => {
                        setCurrentQuotation(quotation)
                        setWindowstate(null)
                      }}
                      className='hidden lg:block'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='border-gray-20 hidden gap-2.5 space-y-2.5 rounded-lg border text-2xl font-bold lg:block lg:bg-white lg:px-10 lg:py-6 lg:shadow-lg'>
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
              currentQuotation.status === 'PENDING' ? (
                <div className='space-y-4 text-2xl font-bold lg:px-10'>
                  <div className='flex flex-row justify-between'>
                    <div>Quotation {currentQuotation.quotationID}</div>
                    <Button onClick={onClose} className='h-8 px-3 text-sm'>
                      Close
                    </Button>
                  </div>

                  <QuotationForm
                    transactionType='Edit'
                    packages={packages}
                    onSubmit={onSaveEditing}
                    setSelectedPackageId={setSelectedPackageId}
                    selectedPackageId={currentQuotation.packageId.toString()}
                    fromDate={currentQuotation.from}
                    toDate={currentQuotation.to}
                    description={currentQuotation.description}
                    customerId={currentQuotation.customerId.toString()}
                  />
                </div>
              ) : (
                <div className='flex flex-col gap-4 space-y-4 text-2xl lg:px-10'>
                  <div className='flex w-full flex-row justify-between text-2xl font-bold'>
                    <div>Quotation {currentQuotation.quotationID}</div>
                    {currentQuotation.status == 'PENDING' && (
                      <Button
                        onClick={onEditButtonClicked}
                        className='h-8 px-3 text-sm'
                      >
                        Edit
                      </Button>
                    )}
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
                    duration={calculateDurationFromDate(
                      currentQuotation.from,
                      currentQuotation.to
                    )}
                    totalPrice={currentQuotation.price}
                  />
                  {currentQuotation.status !== 'PENDING' && (
                    <PreviewView quotationId={currentQuotation.quotationID} />
                  )}
                </div>
              )
            ) : null}
          </div>
        </div>
      )}
    </Container>
  )
}
