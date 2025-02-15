'use server'

import { reverifyCitizenCard } from '@/api/photographer/reverify-citizen-card'

export interface ReverifyCitizenCardAction {
  cardPicture?: File
  citizenId: string
  laserId: string
  expireDate: Date
}

export default async function reverifyCitizenCardAction(
  payload: ReverifyCitizenCardAction
) {
  try {
    await reverifyCitizenCard(payload)
  } catch {
    return
  }
}
