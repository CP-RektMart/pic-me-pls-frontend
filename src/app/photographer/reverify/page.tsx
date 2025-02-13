import getCitizenCard from '@/server/actions/get-citizen-card'

import ReverifyPhotographer from '@/components/reverify-photographer'

export default async function Page() {
  const response = await getCitizenCard()

  console.log(response)

  const citizenCardInfo = response.result || {
    citizenId: '',
    laserId: '',
    picture: '',
    expiredDate: new Date().toISOString(),
  }

  return (
    <ReverifyPhotographer
      citizenId={citizenCardInfo.citizenId}
      laserId={citizenCardInfo.laserId}
      picture={citizenCardInfo.picture}
      expireDate={new Date(citizenCardInfo.expiredDate)}
    />
  )
}
