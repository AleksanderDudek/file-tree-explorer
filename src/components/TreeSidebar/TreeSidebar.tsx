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
        if (value) {
          next.set('q', value)
        } else {
          next.delete('q')
        }
        return next
      },
      { replace: true },
    )
  }

  return (
    <aside className="w-64 shrink-0">
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
        {/* Search */}
        <div className="p-2.5 border-b border-gray-800">
          <div className="relative">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search…"
              className="w-full bg-gray-950 border border-gray-700 rounded-md py-1.5 pl-8 pr-3 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600"
            />
            {query && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                aria-label="Clear search"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tree or search results */}
        <div className="p-1.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
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

function SearchResults({ results, query }: { results: SearchResult[]; query: string }) {
  if (results.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-6">
        No results for &ldquo;{query}&rdquo;
      </p>
    )
  }

  return (
    <div className="space-y-0.5">
      <p className="text-xs text-gray-600 px-2 py-1">
        {results.length} result{results.length !== 1 ? 's' : ''}
      </p>
      {results.map((result) => (
        <Link
          key={result.path}
          to={`/tree/${result.path}`}
          className="flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-gray-800 transition-colors group"
        >
          {result.node.type === 'file' ? (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-400 shrink-0"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-yellow-600 shrink-0"
            >
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          )}
          <div className="min-w-0">
            <p className="text-gray-200 group-hover:text-white truncate transition-colors">
              {result.node.name}
            </p>
            <p className="text-xs text-gray-600 truncate">{result.path}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
