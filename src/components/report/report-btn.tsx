'use client'

import { createReport } from '@/actions/report/create-report'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { ReportFormInput } from './report-form'

export const reportFormSchema = z.object({
  title: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  quotationId: z
    .number()
    .refine(
      (val) => val > 0,
      'Quotation ID is required or it cannot be negative'
    ),
})

export type ReportForm = z.infer<typeof reportFormSchema>

export interface ReportBtnProps {
  quotationId: number
  variant?: string
}

export default function ReportButton({ quotationId, variant }: ReportBtnProps) {
  const router = useRouter()

  const form = useForm<ReportForm>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      title: '',
      description: '',
      quotationId: quotationId,
    },
  })

  const onSubmit = async (data: ReportForm) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        quotationId: data.quotationId,
      }

      await createReport(payload)
      toast.success('Your report has been successfully submitted')
      router.push('/report')
    } catch (err) {
      toast.error(`An error occurred while creating your report: ${err}`)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='w-full px-10 lg:w-28'
          variant={variant ? 'ghost' : 'default'}
        >
          Report issue
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report</DialogTitle>
          <FormProvider {...form}>
            <div className='flex flex-col items-center justify-center'>
              <ReportFormInput onSubmit={onSubmit} form={form} />
            </div>
          </FormProvider>
        </DialogHeader>
        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}
