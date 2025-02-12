import VerifyPhotographer from '@/components/verify-photographer'

export default async function Page() {
  const citizenCardInfo =  {
    citizenId: '',
    laserId: '',
    picture: '',
    expireDate: new Date().toISOString(),
  }

  return (
    <VerifyPhotographer 
      isReverify={false} 
      citizenId={citizenCardInfo.citizenId}
      laserId={citizenCardInfo.laserId}
      picture={citizenCardInfo.picture}
      expireDate={new Date(citizenCardInfo.expireDate)}
    />
  )
}

