import { auth } from '@/auth'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { MiddlewareFactory } from './chain'

export const photographerMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const session = await auth()
    const user = session?.user

    const isPhotographerPath =
      request.nextUrl.pathname.startsWith('/photographer') &&
      !request.nextUrl.pathname.startsWith('/photographers')

    if (isPhotographerPath) {
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
      }
      switch (user?.role) {
        case 'ADMIN':
          return NextResponse.redirect(new URL('/admin', request.nextUrl))
        case 'CUSTOMER':
          return NextResponse.redirect(new URL('/', request.nextUrl))
        default:
          return next(request, event)
      }
    }

    return next(request, event)
  }
}
