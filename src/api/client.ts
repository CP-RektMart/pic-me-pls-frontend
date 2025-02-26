import { auth } from '@/auth'
import createClient, { Middleware } from 'openapi-fetch'

import { paths } from './schema'

const middleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = (await auth())?.accessToken
    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return request
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      // TODO: Refresh token
    }

    return response
  },
}

const client = createClient<paths>({
  baseUrl: process.env.BACKEND_URL,
})

client.use(middleware)

export { client }
