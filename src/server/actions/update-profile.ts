'use server'

import type { ServerActionResponse } from '@/types/server'

export default async function updateProfile(): Promise<
  ServerActionResponse<string | null>
> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/health`)
    const data = await res.json()

    return {
      data,
    }
  } catch (err) {
    console.log(err)

    return {
      data: null,
      error: 'Error occured',
    }
  }
}
