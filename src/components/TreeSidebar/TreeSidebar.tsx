import { Link, useSearchParams } from 'react-router-dom'
import { useTree } from '../../context/TreeContext'
import { searchNodes } from '../../utils/treeUtils'
import TreeNodeItem from '../TreeNodeItem/TreeNodeItem'
import type { SearchResult } from '../../types/tree'

export default function TreeSidebar() {
  const { tree } = useTree()
  const [searchParams, setSearchParams] = useSearchParams()
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
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search…"
              className="input-field w-full py-1.5 pl-7 pr-8 text-[13px]"
            />
            {query && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors"
                aria-label="Clear search"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
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
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-700 mb-2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <p className="text-xs text-gray-600">No results for &ldquo;{query}&rdquo;</p>
      </div>
    )
  }

  return (
    <div className="space-y-0.5">
      <p className="text-[10px] font-semibold text-gray-700 uppercase tracking-wider px-2 py-1">
        {results.length} result{results.length === 1 ? '' : 's'}
      </p>
      {results.map((result) => (
        <Link
          key={result.path}
          to={`/tree/${result.path}`}
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm hover:bg-white/[0.05] transition-all duration-100 group"
        >
          {result.node.type === 'file' ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400/80 shrink-0">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-600/70 shrink-0">
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          )}
          <div className="min-w-0">
            <p className="text-[13px] text-gray-300 group-hover:text-white truncate transition-colors">
              {result.node.name}
            </p>
            <p className="text-[11px] text-gray-700 truncate font-mono">{result.path}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
