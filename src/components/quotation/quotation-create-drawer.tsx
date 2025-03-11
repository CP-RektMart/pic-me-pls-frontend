import { useState } from 'react'

import { Package } from '@/actions/get-packages'
import { Quotation } from '@/actions/get-quotations'
import { WindowState } from '@/types/quotation'
import { Icon } from '@iconify/react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { CreateQuotationForm } from './photographer-quotation'
import QuotationFormDrawer from './quotation-form-drawer'

interface CreateQuotationDrawerProps {
  setWindowstate: (windowstate: WindowState) => void
  setCurrentQuotation: (currentQuotation: Quotation | null) => void
  onSubmit: (data: CreateQuotationForm) => void
  packages: Package[]
  setSelectedPackageId: (selectedPackageId: string) => void
  selectedPackageId: string
}

export default function CreateQuotationDrawer({
  setCurrentQuotation,
  onSubmit,
  packages,
  setSelectedPackageId,
  selectedPackageId,
  setWindowstate,
}: CreateQuotationDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setWindowstate(null)
    setCurrentQuotation(null)
  }

  const onCreateQuotationButtonClicked = () => {
    setWindowstate('create')
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
        <Button
          onClick={() => {
            setIsOpen(true)
            onCreateQuotationButtonClicked()
          }}
          className='lg:hidden'
        >
          <Icon icon='lucide:plus' />
        </Button>
      </DrawerTrigger>

      <DrawerContent className='space-y-4 px-4 pb-10'>
        {/* header */}
        <DrawerHeader className='flex items-center justify-between space-y-4 px-4 py-0'>
          <DrawerTitle className='text-xl font-bold'>
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
        />
      </DrawerContent>
    </Drawer>
  )
}
