import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  pathParts: string[]
}

export default function Breadcrumb({ pathParts }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-400 flex-wrap">
      {pathParts.map((part, index) => {
        const isLast = index === pathParts.length - 1
        const href = `/tree/${pathParts.slice(0, index + 1).join('/')}`

        return (
          <span key={href} className="flex items-center gap-1">
            {index > 0 && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-gray-600 shrink-0"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            )}
            {isLast ? (
              <span className="text-gray-100 font-medium">{part}</span>
            ) : (
              <Link
                to={href}
                className="hover:text-gray-100 transition-colors"
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
