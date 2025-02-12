import { z } from 'zod'

export const userRoleEnum = z.enum(['CUSTOMER', 'PHOTOGRAPHER', 'ADMIN'])

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  profilePictureUrl: z.string(),
  role: userRoleEnum,
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  bank: z.string().optional(),
  accountNo: z.string().optional(),
  bankBranch: z.string().optional(),
})
