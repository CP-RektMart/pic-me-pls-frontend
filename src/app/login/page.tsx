import { auth } from '@/auth'

import LoginPageComponent from '@/components/login-page'

export default async function LoginPage() {
  const session = await auth()
  console.log('Session on server:', session)
  return <LoginPageComponent />
}
