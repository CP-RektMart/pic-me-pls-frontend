import ProfileComponent from '@/components/profile-page'

export default function ProfilePage() {
  const componentProps = { isPhotographer: true } // Add the necessary properties for ProfilePageComponentProps
  return <ProfileComponent ComponentProps={componentProps} />
}
