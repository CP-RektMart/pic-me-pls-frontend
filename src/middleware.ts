import { chainMiddleware } from './middlewares/chain'
import { photographerMiddleware } from './middlewares/photographerMiddleware'
import { userMiddleware } from './middlewares/userMiddleware'

export const middleware = chainMiddleware([
  userMiddleware,
  photographerMiddleware,
])

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}
