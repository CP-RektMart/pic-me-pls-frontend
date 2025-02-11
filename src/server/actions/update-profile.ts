'use server'

export default async function updateProfile(): Promise<JSON | null> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/health`)
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)

    return null
  }
}
