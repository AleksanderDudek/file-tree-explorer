import type { ReactNode } from 'react'

interface NodeHeaderProps {
  readonly title: string
  readonly icon: ReactNode
  readonly badge: string
  readonly variant: 'file' | 'folder'
}

const VARIANTS = {
  file:   { iconBg: 'bg-blue-500/10 border-blue-500/20',   badge: 'text-blue-400/80 bg-blue-500/10 border-blue-500/20' },
  folder: { iconBg: 'bg-amber-500/10 border-amber-500/20', badge: 'text-amber-400/80 bg-amber-500/10 border-amber-500/20' },
} as const

export default function NodeHeader({ title, icon, badge, variant }: NodeHeaderProps) {
  const v = VARIANTS[variant]
  return (
    <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
      <div className={`flex items-center justify-center w-9 h-9 rounded-xl border shrink-0 ${v.iconBg}`}>
        {icon}
      </div>
      <h1 className="text-base font-semibold text-gray-100 break-all flex-1">{title}</h1>
      <span className={`text-[11px] font-medium border px-2 py-0.5 rounded-full ${v.badge}`}>
        {badge}
      </span>
    </div>
  )
}
