import { auth } from '@/auth'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { MiddlewareFactory } from './chain'

export const adminMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const session = await auth()
    const user = session?.user

    const isAdminPath = request.nextUrl.pathname.startsWith('/admin')

    if (isAdminPath) {
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
      }

      switch (user?.role) {
        case 'PHOTOGRAPHER':
          return NextResponse.redirect(
            new URL('/photographer', request.nextUrl)
          )
        case 'CUSTOMER':
          return NextResponse.redirect(new URL('/', request.nextUrl))
        default:
          return NextResponse.redirect(new URL('/', request.nextUrl))
      }
    }

    return next(request, event)
  }
}
