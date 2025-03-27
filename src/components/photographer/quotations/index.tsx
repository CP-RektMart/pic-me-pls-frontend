'use client'

import { useEffect, useState } from 'react'

import { getCustomer } from '@/actions/customer/get-customer'
import { Package } from '@/actions/photographer/package/get-packages'
import createQuotationAction from '@/actions/quotation/create-quotation'
import { Quotation } from '@/actions/quotation/get-quotations'
import updateQuotationAction from '@/actions/quotation/update-quotation'
import { calculateDurationFromDate } from '@/lib/utils'
import { formatDateToString } from '@/lib/utils'
import { QuotationStatus, WindowState } from '@/types/quotation'
import { CustomerPublic } from '@/types/user'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'sonner'
import z from 'zod'

import QuotationCard from '@/components/quotation/quotation-card'
import { QuotationDetails } from '@/components/quotation/quotation-details'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { SidebarProvider } from '../common/sidebar-provider'
import { PreviewView } from './preview-view'
import CreateQuotationDrawer from './quotation-create-drawer'
import QuotationForm from './quotation-form'
import QuotationViewDrawer from './quotation-view-drawer'

export interface PhotographerQuotationProps {
  quotations: Quotation[]
  packages: Package[]
  defaultCustomerId?: number
  defaultWindow: WindowState
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
  packageId: z.string().min(1, 'Please select packages'),
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
  defaultCustomerId,
  defaultWindow,
}: PhotographerQuotationProps) {
  const router = useRouter()
  const [selectedPackageId, setSelectedPackageId] = useState<string>('')

  const [customerId, setCustomerId] = useState<number | undefined>(
    defaultCustomerId
  )
  const [customerProfile, setCustomerProfile] = useState<
    CustomerPublic | undefined
  >()

  useEffect(() => {
    async function fetchCustomer() {
      if (customerId) {
        const data = await getCustomer(customerId)
        setCustomerProfile(data)
      }
    }
    fetchCustomer()
  }, [customerId])

  const [windowState, setWindowstate] = useState<WindowState>(defaultWindow)
  const [currentQuotation, setCurrentQuotation] = useState<Quotation | null>(
    null
  )
  const [isOpen, setIsOpen] = useState(false)

  const isSmallScreen = useMediaQuery({ query: '(max-width: 1023px)' })

  useEffect(() => {
    if (isSmallScreen) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [isSmallScreen])

  const onEditButtonClicked = () => {
    setWindowstate('edit')
    if (currentQuotation) {
      setSelectedPackageId(currentQuotation.packageId.toString())
    }
    setCustomerId(currentQuotation?.customerId || undefined)
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
    <SidebarProvider>
      <div className='flex flex-row justify-between'>
        <div className='text-2xl font-bold'>Quotations</div>
      </div>

      {quotations.length == 0 && !windowState ? (
        <div className='text-medium flex flex-col place-content-center items-center justify-center gap-3 font-medium text-gray-500'>
          <Icon icon='lucide:sticky-note' className='h-20 w-12 text-gray-500' />
          <span>You don&apos;t have any quotations yet</span>
        </div>
      ) : (
        <div className='grid h-full flex-1 grid-cols-1 gap-6 lg:grid-cols-2'>
          <Card className='flex h-full flex-col'>
            <CardHeader>
              <CardTitle className='text-2xl'>Latest Quotations</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-1 flex-col'>
              {quotations.length == 0 ? (
                <div className='flex flex-1 flex-col items-center justify-center gap-2'>
                  <div className='size-16'>
                    <Icon icon='lucide:file' className='size-full' />
                  </div>
                  <p>No quotation here</p>
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
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
                        customerId={customerId}
                        customerProfile={customerProfile}
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
                        photographerImageUrl={quotation.photographerPictureUrl}
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
            </CardContent>
          </Card>

          <Card className='hidden h-full flex-col py-6 lg:flex'>
            <CardContent className='flex flex-1 flex-col'>
              {windowState === 'create' ? (
                <>
                  <div className='block lg:hidden'>
                    <CreateQuotationDrawer
                      setWindowstate={setWindowstate}
                      setCurrentQuotation={setCurrentQuotation}
                      onSubmit={onSubmit}
                      packages={packages}
                      selectedPackageId={selectedPackageId}
                      setSelectedPackageId={setSelectedPackageId}
                      customerId={customerId}
                      customerProfile={customerProfile}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                  </div>
                  <div className='px-10'>
                    <div className='flex items-center space-y-4 text-2xl font-bold'>
                      <div
                        className='mr-2 cursor-pointer rounded-full p-2 hover:bg-gray-200'
                        onClick={() => router.back()}
                      >
                        <Icon icon='lucide:chevron-left' className='size-5' />
                      </div>
                      Create Quotation
                    </div>
                    <QuotationForm
                      transactionType='create'
                      packages={packages}
                      onSubmit={onSubmit}
                      setSelectedPackageId={setSelectedPackageId}
                      selectedPackageId={selectedPackageId}
                      customerId={customerId}
                      customerProfile={customerProfile}
                    />
                  </div>
                </>
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
                      customerId={customerId}
                      customerProfile={customerProfile}
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
                    {currentQuotation.status !== 'PENDING' &&
                      currentQuotation.status !== 'CONFIRMED' && (
                        <PreviewView
                          quotationId={currentQuotation.quotationID}
                          isPhotographer={true}
                        />
                      )}
                  </div>
                )
              ) : null}
            </CardContent>
          </Card>
        </div>
      )}
    </SidebarProvider>
  )
}
