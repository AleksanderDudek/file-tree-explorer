import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  readonly pathParts: string[]
}

export default function Breadcrumb({ pathParts }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-0.5 flex-wrap">
      {pathParts.map((part, index) => {
        const isLast = index === pathParts.length - 1
        const href = `/tree/${pathParts.slice(0, index + 1).join('/')}`

        return (
          <span key={href} className="flex items-center gap-0.5">
            {index > 0 && (
              <span className="text-gray-700 px-0.5 select-none text-sm">/</span>
            )}
            {isLast ? (
              <span className="text-[13px] font-medium text-gray-200 px-1.5 py-0.5 bg-white/[0.05] rounded-md border border-white/[0.06]">
                {part}
              </span>
            ) : (
              <Link
                to={href}
                className="text-[13px] text-gray-600 hover:text-gray-300 px-1.5 py-0.5 rounded-md hover:bg-white/[0.04] transition-all duration-100"
              >
                {part}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
