'use server'

import { UserType } from '@/types/user'
import { cookies } from 'next/headers'

export async function setRole(role: UserType) {
  const cookieStore = await cookies()
  cookieStore.set('role', role)
}
