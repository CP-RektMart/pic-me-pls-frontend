import VerifyPhotographer from '@/components/verify-photographer'

import getCitizenCard from '@/server/actions/get-citizen-card'

export default async function Page() {
  const response = await getCitizenCard()

  const citizenCardInfo = response.result || {
    citizenId: '',
    laserId: '',
    picture: '',
    expiredDate: '',
  }

  const expiredDate = citizenCardInfo.expiredDate 
    ? new Date(citizenCardInfo.expiredDate) 
    : undefined;

  return (
    <VerifyPhotographer 
      isReverify={true} 
      citizenId={citizenCardInfo.citizenId}
      laserId={citizenCardInfo.laserId}
      picture={citizenCardInfo.picture}
      expiredDate={expiredDate}
    />
  )
}

