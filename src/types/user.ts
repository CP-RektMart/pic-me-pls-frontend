import { components } from '@/api/schema'

export type UserType = 'Customer' | 'Photographer' | ''

export type UserRole = 'CUSTOMER' | 'PHOTOGRAPHER' | 'ADMIN'

export type User = components['schemas']['dto.UserResponse']
