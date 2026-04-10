import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, X, Folder } from 'lucide-react'
import { useTree } from '../../context/TreeContext'
import { searchNodes } from '../../utils/treeUtils'
import { getFileIcon } from '../../utils/fileIcons'
import TreeNodeItem from '../TreeNodeItem/TreeNodeItem'
import type { SearchResult } from '../../types/tree'

export default function TreeSidebar() {
  const { tree } = useTree()
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const query = searchParams.get('q') ?? ''

  if (!tree) return null

  const searchResults: SearchResult[] = query.length > 0 ? searchNodes(tree, query) : []

  function handleSearch(value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set('q', value)
        else next.delete('q')
        return next
      },
      { replace: true },
    )
  }

  return (
    <aside className="w-60 shrink-0">
      <div className="bg-[#0a1120]/90 border border-white/[0.07] rounded-xl overflow-hidden flex flex-col shadow-card backdrop-blur-sm">

        {/* Search */}
        <div className="p-2.5 border-b border-white/[0.06]">
          <div className="relative">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t('sidebar.searchPlaceholder')}
              className="input-field w-full py-1.5 pl-7 pr-8 text-[13px]"
            />
            {query && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors"
                aria-label={t('sidebar.clearSearch')}
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Tree or search results */}
        <div className="p-1.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 9.5rem)' }}>
          {query ? (
            <SearchResults results={searchResults} query={query} />
          ) : (
            <TreeNodeItem node={tree} path={tree.name} depth={0} />
          )}
        </div>

      </div>
    </aside>
  )
}

function SearchResults({ results, query }: { readonly results: SearchResult[]; readonly query: string }) {
  const { t } = useTranslation()

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Search size={28} className="text-gray-700 mb-2" />
        <p className="text-xs text-gray-600">{t('sidebar.noResults', { query })}</p>
      </div>
    )
  }

  return (
    <div className="space-y-0.5">
      <p className="text-[10px] font-semibold text-gray-700 uppercase tracking-wider px-2 py-1">
        {t('sidebar.results', { count: results.length })}
      </p>
      {results.map((result) => {
        const isFile = result.node.type === 'file'
        const { Icon, className: iconColor } = isFile ? getFileIcon(result.node.name) : { Icon: Folder, className: 'text-amber-600/70' }
        return (
          <Link
            key={result.path}
            to={`/tree/${result.path}`}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm hover:bg-white/[0.05] transition-all duration-100 group"
          >
            <Icon size={isFile ? 13 : 14} className={`${iconColor} shrink-0`} />
            <div className="min-w-0">
              <p className="text-[13px] text-gray-300 group-hover:text-white truncate transition-colors">
                {result.node.name}
              </p>
              <p className="text-[11px] text-gray-700 truncate font-mono">{result.path}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
