import { components } from '@/api/schema'

export type UserType = 'Customer' | 'Photographer' | ''

export type UserRole = 'CUSTOMER' | 'PHOTOGRAPHER' | 'ADMIN'

export type User = components['schemas']['dto.UserResponse']

export type UserProfile = {
  id: string
  name: string
  email: string
  phoneNumber: string
  profilePictureUrl: string
  role: string
  facebook: string
  instagram: string
}
