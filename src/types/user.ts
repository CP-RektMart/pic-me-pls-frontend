import { userRoleEnum } from '@/server/actions/register'
import { z } from 'zod'

export type UserType = 'Customer' | 'Photographer' | ''

export type UserRole = z.infer<typeof userRoleEnum>

export type User = {
  id: number
  name: string
  email: string
  phoneNumber: string
  profilePictureUrl: string
  role: UserRole
  facebook?: string
  instagram?: string
  bank?: string
  accountNo?: string
  bankBranch?: string
}
