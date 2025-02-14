'use server'

import { UserType } from '@/types/user'
import { cookies } from 'next/headers'

export async function setRole(role: UserType | undefined) {
  const cookieStore = await cookies()

  if (role) {
    cookieStore.set('role', role)
  } else {
    cookieStore.delete('role')
  }
}
