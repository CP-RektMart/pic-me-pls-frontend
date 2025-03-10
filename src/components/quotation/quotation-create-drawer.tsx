import { useState } from 'react'

import { quotation } from '@/app/photographer/quotation/page'
import { Icon } from '@iconify/react'

import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

import { EditPackageForm } from '../photographer/package-page/edit-package'
import { CreateQuotationProps } from './photographer-quotation'
import QuotationFormDrawer from './quotation-form-drawer'

interface CreateQuotationDrawerProps {
  setIsCreating: (isCreating: boolean) => void
  setIsEditing: (isEditing: boolean) => void
  setCurrentQuotation: (currentQuotation: quotation | null) => void
  onSubmit: (data: CreateQuotationProps) => void
  packages: EditPackageForm[]
  setSelectedPackage: (selectedPackage: string) => void
  selectedPackage: string
}

export default function CreateQuotationDrawer({
  setIsCreating,
  setIsEditing,
  setCurrentQuotation,
  onSubmit,
  packages,
  setSelectedPackage,
  selectedPackage,
}: CreateQuotationDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsCreating(false)
    setIsEditing(false)
    setCurrentQuotation(null)
  }

  const onCreateQuotationButtonClicked = () => {
    setIsCreating(true)
    setIsEditing(false)
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) onClose()
      }}
    >
      <Button
        onClick={() => {
          setIsOpen(true)
          onCreateQuotationButtonClicked()
        }}
        className='lg:hidden'
      >
        <Icon icon='lucide:plus' />
      </Button>

      <DrawerContent className='py-6 lg:hidden'>
        <Container>
          <div className='space-y-4 text-2xl font-bold lg:px-10'>
            Create Quotation
            <QuotationFormDrawer
              transactionType='create'
              onSubmit={onSubmit}
              packages={packages}
              setSelectedPackage={setSelectedPackage}
              selectedPackage={selectedPackage}
              setIsOpen={setIsOpen}
            />
          </div>
          <DrawerHeader className='lg:hidden'>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
        </Container>
      </DrawerContent>
    </Drawer>
  )
}
