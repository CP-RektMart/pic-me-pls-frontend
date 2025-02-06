import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        className,
        'mx-auto size-full max-w-7xl px-4 sm:px-6 lg:px-8'
      )}
    >
      {children}
    </div>
  )
}
