'use server'

import { uploadObjectResponse } from '@/api/upload-object'
import { auth } from '@/auth'

export async function postImageChatUpload(file: File) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', 'CHAT_IMAGE')

  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/objects`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: formData,
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Upload failed')
  }

  const data = await res.json()
  return uploadObjectResponse.parse(data).result
}
