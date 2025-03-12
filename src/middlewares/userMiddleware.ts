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

    return next(request, event)
  }
}
