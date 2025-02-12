'use server'

import { auth } from '@/auth'
import { ServerResponse } from '@/type/server'

interface formData {
    citizenId: string
    laserId: string
    picture: string
    expiredDate: Date
    terms: boolean
}

export default async function updateCitizenCard(
  formData: formData
): Promise<ServerResponse<string | null>> {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return {
        result: null,
        error: 'Failed to authenticate',
      }
    }

    const formDataBody = new FormData();
    formDataBody.append("citizenId", formData.citizenId);
    formDataBody.append("laserId", formData.laserId);
    formDataBody.append("cardPicture", formData.picture);
    formDataBody.append("expireDate", formData.expiredDate.toISOString());

    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/photographer/reverify`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: formDataBody,
    })

    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)

    return {
      result: null,
      error: 'Failed to update user profile',
    }
  }
}
