import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn(className, 'mx-auto max-w-7xl px-6 xl:px-0')}>
      {children}
    </div>
  )
}
