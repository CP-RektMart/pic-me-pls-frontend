'use server'

import { auth } from '@/auth'

export default async function login() {
  try {
    const session = await auth()
    console.log('Session on server:', session)
    return session
  } catch (e) {
    console.log('kuy')
    console.error(e)
  }
}
