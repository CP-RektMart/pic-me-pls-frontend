import { auth } from '@/auth'

import Container from '@/components/container'
import { Box } from '@/components/developer/box'

export default async function DeveloperPage() {
  const session = await auth()

  const accessToken = `Bearer ${session?.accessToken}`
  const refreshToken = `Bearer ${session?.refreshToken}`
  const expireAt = `${session?.expireAt}`

  return (
    <Container className='space-y-4 py-16'>
      <h1 className='text-xl font-bold'>Developer Tools</h1>
      <Box title='Access Token' text={accessToken} />
      <Box title='Refresh Token' text={refreshToken} />
      <Box title='Expire Date' text={expireAt} />
    </Container>
  )
}
