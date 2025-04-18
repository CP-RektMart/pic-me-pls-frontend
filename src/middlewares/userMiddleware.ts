import { auth } from '@/auth'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { MiddlewareFactory } from './chain'

export const userMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const session = await auth()
    const user = session?.user
    const path = request.nextUrl.pathname

    if (['/login', '/sign-up'].includes(path)) {
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

    const isAdminPath = path.startsWith('/admin')

    const isPhotographerPath =
      path.startsWith('/photographer') && !path.startsWith('/photographers')

    if (!isAdminPath && user?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.nextUrl))
    }

    if (!isPhotographerPath && user?.role === 'PHOTOGRAPHER') {
      return NextResponse.redirect(new URL('/photographer/', request.nextUrl))
    }

    return next(request, event)
  }
}
