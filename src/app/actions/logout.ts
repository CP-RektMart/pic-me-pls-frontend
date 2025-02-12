'use server'

import { auth } from '@/auth'

export async function logout() {
  try {
    const url = `${process.env.BACKEND_URL}/api/v1/auth/logout`
    const session = await auth()

    if (!session) {
      return { error: 'No session found' }
    }

    const access_token = session.accessToken

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!response.ok) {
      return { error: 'Failed to logout' }
    }
    return { success: true }
  } catch (err) {
    return { error: err }
  }
}
