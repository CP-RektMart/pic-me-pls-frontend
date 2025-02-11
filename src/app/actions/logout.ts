'use server'

import { signOut } from '@/auth'

export async function logout() {
  await signOut({
    redirect: true,
    redirectTo: '/',
  })
}
