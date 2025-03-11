import { useState } from 'react'

import { quotation } from '@/actions/get-quotations'
import { Icon } from '@iconify/react'

import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

import { EditPackageForm } from '../photographer/package-page/edit-package'
import { CreateQuotationProps } from './photographer-quotation'
import QuotationFormDrawer from './quotation-form-drawer'

interface CreateQuotationDrawerProps {
  setWindowstate: (windowstate: string) => void
  setCurrentQuotation: (currentQuotation: quotation | null) => void
  onSubmit: (data: CreateQuotationProps) => void
  packages: EditPackageForm[]
  setSelectedPackage: (selectedPackage: string) => void
  selectedPackage: string
}

export default function CreateQuotationDrawer({
  setCurrentQuotation,
  onSubmit,
  packages,
  setSelectedPackage,
  selectedPackage,
  setWindowstate,
}: CreateQuotationDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setWindowstate('')
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
        </Container>
      </DrawerContent>
    </Drawer>
  )
}
