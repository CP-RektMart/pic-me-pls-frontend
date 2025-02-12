'use server'

import { auth } from '@/auth'
import { ServerResponse } from '@/type/server'

interface userProfile {
  id: number
  role: string
  name: string
  profile_picture_url: string
  email: string
  facebook: string
  instagram: string
  phone_number: string
  bank?: string
  bank_branch?: string
  account_no?: string
}

export default async function getProfile(): Promise<
  ServerResponse<userProfile | null>
> {
  try {
    const session = await auth()

    if (!session) {
      return {
        result: null,
        error: 'Failed to authenticate',
      }
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (!response.ok) {
      return {
        result: null,
        error: 'Failed to get user profile',
      }
    }

    const data = await response.json()

    return data
  } catch (err) {
    console.log(err)

    return {
      result: null,
      error: 'Failed to get user profile',
    }
  }
}
