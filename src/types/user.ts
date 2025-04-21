import { components } from '@/api/schema'

export type UserType = 'Customer' | 'Photographer' | ''

export type UserRole = 'CUSTOMER' | 'PHOTOGRAPHER' | 'ADMIN'

export type PublicUser = components['schemas']['dto.PublicUserResponse']

export type User = components['schemas']['dto.UserResponse']

export type UserProfile = {
  id?: number
  name: string
  email: string
  phoneNumber: string
  profilePictureUrl: string
  role: string
  facebook: string
  instagram: string
}

export type CustomerPublic = components['schemas']['dto.CustomerPublicResponse']
