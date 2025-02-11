'use server'

import { auth } from '@/auth'

export async function logout() {
  try {
    const url = `${process.env.BACKEND_URL}/api/v1/auth/logout`
    const session = await auth()

    if (!session) {
      return { error: 'No session found' }
    }

    const access_token = session?.accessToken
    console.log('access_token', access_token)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!response.ok) {
      return { error: 'Failed to logout', access_token: access_token }
    }
    return { success: true, status: response.status }
  } catch (e) {
    console.error(e)
    return { error: 'An error occurred during logout' }
  }
}
