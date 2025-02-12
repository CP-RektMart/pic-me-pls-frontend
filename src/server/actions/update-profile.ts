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

    const form = new FormData()
    form.append('id', session.user.userId.toString())
    form.append('name', formData.name)
    form.append('email', formData.email)
    form.append('phone_number', formData.phone.replace(/-/g, ''))
    form.append('facebook', formData.facebook || '')
    form.append('instagram', formData.instagram || '')
    form.append('bank', formData.bank || '')
    form.append('account_no', formData.accountNo || '')
    form.append('bank_branch', formData.bankBranch || '')
    form.append('role', session.user.role)

    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: form,
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
