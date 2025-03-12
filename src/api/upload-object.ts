import { auth } from '@/auth'
import { z } from 'zod'

export const uploadObjectRequest = z.object({
  file: z.instanceof(File),
  folder: z.enum(['PACKAGE', 'VERIFY_CITIZENCARD', 'PROFILE_IMAGE']),
})

export type UploadObjectRequest = z.infer<typeof uploadObjectRequest>

export const uploadObjectResponse = z.object({
  result: z.object({
    url: z.string(),
  }),
})

export type UploadObjectResponse = z.infer<typeof uploadObjectResponse>

export async function uploadObject(req: UploadObjectRequest) {
  const session = await auth()

  const formData = new FormData()
  formData.append('file', req.file)
  formData.append('folder', req.folder)

  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/objects`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error)
  }

  const data = await response.json()
  return uploadObjectResponse.parse(data).result
}
