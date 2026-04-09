import { type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTree } from '../../context/TreeContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { tree, setTree } = useTree()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-base font-semibold text-gray-100 hover:text-white transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-400"
            >
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            FileTree Explorer
          </Link>

          <div className="flex items-center gap-4">
            {tree && !isHome && (
              <Link
                to="/tree"
                className="text-sm text-gray-400 hover:text-gray-100 transition-colors"
              >
                View Tree
              </Link>
            )}
            {tree && (
              <button
                onClick={() => setTree(null)}
                className="text-sm text-gray-500 hover:text-red-400 transition-colors"
                title="Clear loaded tree"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
