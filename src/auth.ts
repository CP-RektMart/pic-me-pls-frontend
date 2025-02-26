import NextAuth from 'next-auth'
import 'next-auth/jwt'
import Google from 'next-auth/providers/google'
import { NextRequest } from 'next/server'

import { client } from './api/client'
import { UserRole, User as UserType } from './types/user'

export const { handlers, signIn, signOut, auth } = NextAuth(
  async (req: NextRequest | undefined) => {
    return {
      providers: [Google],
      session: {
        maxAge: 7 * 24 * 60 * 60, // 7 days
      },
      pages: {
        signIn: '/login',
        signOut: '/',
        error: '/sign-up',
      },
      callbacks: {
        signIn: async ({ user, account }) => {
          const role = req && req.cookies.get('role')?.value

          if (!account || !account.id_token) return false

          // Register
          if (role) {
            try {
              const { data, response } = await client.POST(
                '/api/v1/auth/register',
                {
                  body: {
                    idToken: account.id_token,
                    provider: account.provider.toUpperCase(),
                    role: role.toUpperCase() as UserRole,
                  },
                }
              )

              if (
                response.status !== 200 ||
                !data ||
                !data.result ||
                'error' in data
              ) {
                return false
              }

              user.accessToken = data.result.accessToken
              user.refreshToken = data.result.refreshToken
              user.expireAt = data.result.exp
              user.user = data.result.user

              return true
            } catch (error) {
              console.error('Error during sign up:', error)
              return false
            }
          }

          // Login
          try {
            const { data, response } = await client.POST('/api/v1/auth/login', {
              body: {
                idToken: account.id_token,
                provider: account.provider.toUpperCase(),
              },
            })

            if (
              response.status !== 200 ||
              !data ||
              !data.result ||
              'error' in data
            ) {
              return false
            }

            user.accessToken = data.result.accessToken
            user.refreshToken = data.result.refreshToken
            user.expireAt = data.result.exp
            user.user = data.result.user

            return true
          } catch (error) {
            console.error('Error during sign in:', error)
            return false
          }
        },
        async jwt({ token, user }) {
          if (user) {
            token.accessToken = user.accessToken
            token.refreshToken = user.refreshToken
            token.expireAt = user.expireAt
            token.user = user.user
          }
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
            session.user.userId = token.user.id as number
            session.user.phoneNumber = token.user.phoneNumber
            session.user.role = token.user.role
            session.user.accountNo = token.user.accountNo
            session.user.bank = token.user.bank
            session.user.bankBranch = token.user.bankBranch
            session.user.instagram = token.user.instagram
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
    user?: Omit<UserType, 'id'> & { userId: number }
  }

  interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    accessToken?: string
    refreshToken?: string
    expireAt?: number
    user?: UserType
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    expireAt?: number
    user?: UserType
  }
}
