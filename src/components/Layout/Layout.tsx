import { type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FolderTree, GitBranch, Trash2 } from 'lucide-react'
import { useTree } from '../../context/TreeContext'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'

interface LayoutProps {
  readonly children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { tree, setTree } = useTree()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const isHome = pathname === '/'

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 bg-grid">
      <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#030712]/90 backdrop-blur-xl shadow-header">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/25 group-hover:bg-blue-500/25 group-hover:border-blue-400/40 transition-all duration-200">
              <FolderTree size={14} className="text-blue-400" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-gray-300 group-hover:text-white transition-colors duration-200">
              {t('layout.title')}
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            <LanguageSwitcher />
            {tree && !isHome && (
              <Link
                to="/tree"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-200 px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-all duration-150"
              >
                <GitBranch size={12} />
                {t('layout.viewTree')}
              </Link>
            )}
            {tree && (
              <button
                onClick={() => setTree(null)}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-all duration-150"
                title={t('layout.clearTreeTitle')}
              >
                <Trash2 size={12} />
                {t('layout.clearTree')}
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-8">{children}</main>
    </div>
  )
}
