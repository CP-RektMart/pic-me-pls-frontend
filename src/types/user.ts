import { userResponseSchema, userRoleEnum } from '@/api/auth/common'
import { z } from 'zod'

export type UserType = 'Customer' | 'Photographer' | ''

export type UserRole = z.infer<typeof userRoleEnum>

export type User = z.infer<typeof userResponseSchema>
