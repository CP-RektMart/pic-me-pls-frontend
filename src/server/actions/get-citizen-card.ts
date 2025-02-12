'use server'

import { auth } from '@/auth'
import { ServerResponse } from '@/type/server'

interface CitizenCardInfo {
  citizenId: string
  laserId: string
  picture: string
  expiredDate: string
}

export default async function getCitizenCard(): Promise<
  ServerResponse<CitizenCardInfo | null>
> {
  try {
    const session = await auth()

    if (!session) {
      return {
        result: null,
        error: 'Failed to authenticate',
      }
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/photographer/citizen-card`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (!response.ok) {
      return {
        result: null,
        error: 'Failed to get citizen card',
      }
    }

    const data: ServerResponse<CitizenCardInfo> = await response.json()

    return data
  } catch (err) {

    return {
      result: null,
      error: 'Failed to get citizen card',
    }
  }
}
