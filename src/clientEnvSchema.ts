import z from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_WEBSOCKET_URL: z.string(),
})

export const envClientSchema = envSchema.parse({
  NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
})
