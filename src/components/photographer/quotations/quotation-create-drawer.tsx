import { Package } from '@/actions/photographer/package/get-packages'
import { Quotation } from '@/actions/quotation/get-quotations'
import { WindowState } from '@/types/quotation'
import { CustomerPublic } from '@/types/user'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

import { CreateQuotationForm } from '.'
import QuotationFormDrawer from './quotation-form-drawer'

interface CreateQuotationDrawerProps {
  setWindowstate: (windowstate: WindowState) => void
  setCurrentQuotation: (currentQuotation: Quotation | null) => void
  onSubmit: (data: CreateQuotationForm) => void
  packages: Package[]
  customerId?: number
  customerProfile?: CustomerPublic
  setSelectedPackageId: (selectedPackageId: string) => void
  selectedPackageId: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function CreateQuotationDrawer({
  setCurrentQuotation,
  onSubmit,
  packages,
  customerId,
  customerProfile,
  setSelectedPackageId,
  selectedPackageId,
  setWindowstate,
  isOpen,
  setIsOpen,
}: CreateQuotationDrawerProps) {
  const router = useRouter()

  const onClose = () => {
    setWindowstate(null)
    setCurrentQuotation(null)
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(false)
        if (!open) onClose()
      }}
    >
      <DrawerContent className='space-y-4 px-4 pb-10'>
        {/* header */}
        <DrawerHeader className='flex items-center justify-between space-y-4 px-4 py-0'>
          <DrawerTitle className='flex items-center text-xl font-bold'>
            <div
              className='mr-2 cursor-pointer rounded-full p-1 hover:bg-gray-200'
              onClick={() => router.back()}
            >
              <Icon icon='lucide:chevron-left' className='size-5' />
            </div>
            Create Quotation
          </DrawerTitle>
        </DrawerHeader>

        {/* body */}
        <QuotationFormDrawer
          transactionType='create'
          onSubmit={onSubmit}
          packages={packages}
          setSelectedPackageId={setSelectedPackageId}
          selectedPackageId={selectedPackageId}
          setIsOpen={setIsOpen}
          customerId={customerId}
          customerProfile={customerProfile}
        />
      </DrawerContent>
    </Drawer>
  )
}
