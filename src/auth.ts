import NextAuth from 'next-auth'
import 'next-auth/jwt'
import Google from 'next-auth/providers/google'
import { NextRequest } from 'next/server'

export const { handlers, signIn, signOut, auth } = NextAuth(
  async (req: NextRequest | undefined) => {
    return {
      providers: [Google],
      callbacks: {
        signIn: async ({ user, account }) => {
          const role = (req && req.cookies.get('role')?.value) || 'CUSTOMER'

          if (account) {
            try {
              const url = `${process.env.BACKEND_URL}/api/v1/auth/login`
              const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                  idToken: account.id_token,
                  provider: account.provider.toUpperCase(),
                  role: role.toUpperCase(),
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              })

              if (!res.ok) {
                return false
              }

              const data = await res.json()

              user.accessToken = data.result.accessToken
              user.refreshToken = data.result.refreshToken
              user.expireAt = data.result.exp
              user.user = data.result.user

              return true
            } catch (error) {
              console.error('Error during sign in:', error)
              return false
            }
          }

          return false
        },
        async jwt({ token, user }) {
          if (user) {
            token.accessToken = user.accessToken
            token.refreshToken = user.refreshToken
            token.expireAt = user.expireAt
            token.user = user.user
          }

          // // Access token has expired
          // if (
          //   token.expireAt &&
          //   Date.now() >= token.expireAt &&
          //   token.refreshToken
          // ) {
          //   try {
          //     const url = `${process.env.BACKEND_URL}/api/v1/auth/refresh-token`
          //     const res = await fetch(url, {
          //       method: 'POST',
          //       body: JSON.stringify({
          //         refreshToken: token.refreshToken,
          //       }),
          //       headers: {
          //         'Content-Type': 'application/json',
          //       },
          //     })

          //     if (!res.ok) {
          //       throw new Error('Failed to refresh token')
          //     }

          //     const data = await res.json()

          //     token.accessToken = data.result.accessToken
          //     token.refreshToken = data.result.refreshToken
          //     token.expireAt = data.result.exp
          //   } catch (error) {
          //     console.error('Error during token refresh:', error)
          //     throw new Error('Token refresh failed')
          //   }
          // }

          return token
        },
        async session({ session, token }) {
          if (token?.accessToken) {
            session.accessToken = token.accessToken
          }
          if (token?.refreshToken) {
            session.refreshToken = token.refreshToken
          }
          if (token?.expireAt) {
            session.expireAt = token.expireAt
          }
          if (token?.user) {
            session.user.userId = token.user.id
            session.user.phone_number = token.user.phone_number
            session.user.role = token.user.role
            session.user.account_no = token.user.account_no
            session.user.bank = token.user.bank
            session.user.bank_branch = token.user.bank_branch
            session.user.instragram = token.user.instragram
            session.user.facebook = token.user.facebook
          }

          return session
        },
      },
    }
  }
)

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    refreshToken?: string
    expireAt?: number
    user?: {
      userId: number
      phone_number: string
      role: string
      account_no: string
      bank: string
      bank_branch: string
      instragram: string
      facebook: string
    }
  }

  interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    accessToken?: string
    refreshToken?: string
    expireAt?: number
    user?: {
      account_no: string
      bank: string
      bank_branch: string
      email: string
      facebook: string
      id: number
      instragram: string
      name: string
      phone_number: string
      profile_picture_url: string
      role: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    expireAt?: number
    user?: {
      account_no: string
      bank: string
      bank_branch: string
      email: string
      facebook: string
      id: number
      instragram: string
      name: string
      phone_number: string
      profile_picture_url: string
      role: string
    }
  }
}
