'use server'

import { auth } from '@/auth'

export default async function verifyCitizenCardAction(payload: FormData) {
  const session = await auth()
  const url = `${process.env.BACKEND_URL}/api/v1/photographer/verify`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: payload,
    })

    if (!response.ok) {
      console.log(response)
      return { error: response.statusText }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during sign in:', error)
    return { error: 'An error occurred while signing in' }
  }
}
