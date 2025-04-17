import { auth } from '@/auth'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { MiddlewareFactory } from './chain'

export const userMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const session = await auth()
    const user = session?.user

    if (
      request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/sign-up'
    ) {
      if (user) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
      }
    }

    if (request.nextUrl.pathname.startsWith('/developer')) {
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
      }
      return next(request, event)
    }

    const isAdminPath = request.nextUrl.pathname.startsWith('/admin')

    const isPhotographerPath =
      request.nextUrl.pathname.startsWith('/photographer') &&
      !request.nextUrl.pathname.startsWith('/photographers')

    if (!isAdminPath && user?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.nextUrl))
    }

    if (!isPhotographerPath && user?.role === 'PHOTOGRAPHER') {
      return NextResponse.redirect(new URL('/photographer/', request.nextUrl))
    }

    return next(request, event)
  }
}
