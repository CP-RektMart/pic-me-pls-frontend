import { z } from 'zod'

export const citizenCardResponse = z.object({
  citizenId: z.string(),
  laserId: z.string(),
  picture: z.string(),
  expireDate: z.date(),
})
