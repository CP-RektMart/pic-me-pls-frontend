'use server'

import { uploadObject } from '@/api/upload-object'

export async function postImageChatUpload(file: File) {
  return uploadObject({
    file: file,
    folder: 'CHAT_IMAGE',
  })
}
