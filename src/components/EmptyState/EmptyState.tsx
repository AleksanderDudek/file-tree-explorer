import type { ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react'
import type { LucideProps } from 'lucide-react'

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>

type EmptyStateSize = 'sm' | 'md' | 'lg'

interface EmptyStateProps {
  readonly icon: LucideIcon
  readonly title: string
  readonly subtitle?: string
  readonly action?: ReactNode
  readonly size?: EmptyStateSize
}

const SIZE_ICON: Record<EmptyStateSize, number> = { sm: 20, md: 28, lg: 36 }
const SIZE_BOX:  Record<EmptyStateSize, string> = {
  sm: 'w-10 h-10 rounded-xl',
  md: 'w-14 h-14 rounded-2xl',
  lg: 'w-20 h-20 rounded-3xl',
}
const SIZE_TITLE:   Record<EmptyStateSize, string> = { sm: 'text-xs', md: 'text-sm', lg: 'text-sm' }
const SIZE_PADDING: Record<EmptyStateSize, string> = { sm: 'py-6',   md: 'py-8',   lg: 'py-8'   }

export default function EmptyState({ icon: Icon, title, subtitle, action, size = 'md' }: EmptyStateProps) {
  const iconSize   = SIZE_ICON[size]
  const boxSize    = SIZE_BOX[size]
  const titleClass = SIZE_TITLE[size]
  const padding    = SIZE_PADDING[size]

  return (
    <div className={`flex flex-col items-center justify-center ${padding} text-center`}>
      <div className={`flex items-center justify-center ${boxSize} bg-white/[0.03] border border-white/[0.06] mb-4`}>
        <Icon size={iconSize} className="text-gray-600" />
      </div>
      <p className={`${titleClass} text-gray-500 font-medium`}>{title}</p>
      {subtitle && <p className="text-xs text-gray-700 font-mono mt-1 max-w-xs truncate">{subtitle}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
