// 'use server'

// // import { verifyCitizenCard } from '@/api/photographer/verify-citizen-card'
// import { auth } from '@/auth'

// export default async function verifyCitizenCardAction(payload: FormData) {
//   console.log('here991')
//   const session = await auth()

//   console.log('here992')

//   if (!session || !session.accessToken) {
//     return { error: 'Failed to authenticate' }
//   }

//   try {
//     // await verifyCitizenCard(session.accessToken, payload)
//   } catch (error) {
//     console.error(error)
//     return { error: 'Failed to verify citizen card' }
//   }
// }
