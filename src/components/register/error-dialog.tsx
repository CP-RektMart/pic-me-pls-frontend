import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export default function ErrorDialog() {
  const searchParams = useSearchParams()

  const [isLoggedInError, setIsLoggedInError] = useState(
    searchParams.get('error') === 'AccessDenied'
  )

  return (
    <AlertDialog open={isLoggedInError} onOpenChange={setIsLoggedInError}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-red-700'>
            Access Denied
          </AlertDialogTitle>
          <AlertDialogDescription>
            {
              "You might have already signed up or you don't have an account yet."
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Dismiss</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
