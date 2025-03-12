import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export type ChainableMiddleware = (
  request: NextRequest,
  event: NextFetchEvent
) => Promise<NextResponse>

export type MiddlewareFactory = (
  middleware: ChainableMiddleware
) => ChainableMiddleware

export function chainMiddleware(
  functions: MiddlewareFactory[] = [],
  index = 0
): ChainableMiddleware {
  const current = functions[index]
  if (current) {
    const next = chainMiddleware(functions, index + 1)
    return current(next)
  }

  return async (request) => NextResponse.next({ request })
}
