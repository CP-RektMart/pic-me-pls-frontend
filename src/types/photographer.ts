import { components } from '@/api/schema'

export type Photographer = components['schemas']['dto.PhotographerResponse']

export type CitizenCard = components['schemas']['dto.CitizenCardResponse']

export type PhotographerAdmin =
  components['schemas']['dto.HttpResponse-dto_PaginationResponse-ListPhotographerResponse']
