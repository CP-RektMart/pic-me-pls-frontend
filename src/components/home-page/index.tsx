import Image from 'next/image'

export default function HomePageComponent() {
  return (
    <div>
      <Image
        src='image.png'
        alt='Description of the image'
        height={300}
        width={300}
      />
    </div>
  )
}
