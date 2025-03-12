import { auth } from '@/auth'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { MiddlewareFactory } from './chain'

export const photographerMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const session = await auth()
    const user = session?.user

    const isPhotographerPath =
      request.nextUrl.pathname.startsWith('/photographer/')

    if (isPhotographerPath) {
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
      }
      if (user?.role !== 'PHOTOGRAPHER') {
        return NextResponse.redirect(new URL('/', request.nextUrl))
      }
    }

    return next(request, event)
  }
}
