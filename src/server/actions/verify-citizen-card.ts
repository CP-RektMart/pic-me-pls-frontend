'use server'

import { verifyCitizenCard } from '@/api/photographer/verify-citizen-card'
import { auth } from '@/auth'

interface VerifyCitizenCard {
  citizenId: string
  laserId: string
  expireDate: Date
  cardPicture: File
}

export default async function verifyCitizenCardAction(
  payload: VerifyCitizenCard
) {
  console.log('here991')
  const session = await auth()

  console.log('here992')

  if (!session || !session.accessToken) {
    return { error: 'Failed to authenticate' }
  }

  try {
    await verifyCitizenCard({
      accessToken: session.accessToken,
      citizenId: payload.citizenId,
      laserId: payload.laserId,
      expireDate: payload.expireDate,
      cardPicture: payload.cardPicture,
    })
  } catch (error) {
    console.error(error)
    return { error: 'Failed to verify citizen card' }
  }
}
