'use server'

import { verifyCitizenCard } from '@/api/photographer/verify-citizen-card'

export interface VerifyCitizenCardAction {
  cardPicture: File
  citizenId: string
  laserId: string
  expireDate: Date
}

export default async function verifyCitizenCardAction(
  payload: VerifyCitizenCardAction
) {
  try {
    await verifyCitizenCard(payload)
  } catch {
    return
  }
}
