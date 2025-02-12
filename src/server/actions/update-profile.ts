'use server'

import { auth } from '@/auth'
import { ServerResponse } from '@/type/server'

interface formData {
  name: string
  email: string
  phone: string
  facebook?: string
  instagram?: string
  bank?: string
  accountNo?: string
  bankBranch?: string
}

export default async function updateProfile(
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

    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        id: session.user.userId,
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone.replace(/-/g, ''),
        facebook: formData.facebook,
        instagram: formData.instagram,
        bank: formData.bank,
        account_no: formData.accountNo,
        bank_branch: formData.bankBranch,
        role: session.user.role,
      }),
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
