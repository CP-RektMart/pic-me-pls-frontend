'use server'

import { client } from '@/api/client'

export default async function getChats() {
  const { data: messages } = await client.GET('/api/v1/messages')

  console.log(messages)

  if (!messages) {
    return null
  }

  return
}
