import { PackageVerbose } from '@/types/package'

import { Container } from '@/components/container'

interface PackageProps {
  package: PackageVerbose
}

export function PackagePage(props: PackageProps) {
  return (
    <Container className='py-6'>
      test
      {props.package.name} {props.package.id}
      {props.package.price}
    </Container>
  )
}
