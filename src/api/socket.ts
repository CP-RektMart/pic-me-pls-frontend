// import { auth } from '@/auth'

// // const session = await auth()
// // export const socket = new WebSocket('ws://localhost:8000/api/v1/messages/ws', [
// //   'Authorization',
// //   `Bearer ${session?.accessToken}`,
// // ])

// async function createWebSocket() {
//   // try {
//   const session = await auth()
//   const token = session?.accessToken
//   console.log(token)

//   //     if (!token) {
//   //       console.error('No token available')
//   //       return null
//   //     }

//   //     return new WebSocket(
//   //       `ws://localhost:8000/api/v1/messages/ws?token=${token}`
//   //     )
//   //   } catch (error) {
//   //     console.error('WebSocket authentication error:', error)
//   //     return null
//   //   }
// }

// const socket = await createWebSocket()
// export { socket }
