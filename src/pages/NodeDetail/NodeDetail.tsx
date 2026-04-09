import { useParams, Link } from 'react-router-dom'
import { useTree } from '../../context/TreeContext'
import { findNodeByPath, getTotalSize, sortNodes } from '../../utils/treeUtils'
import { formatSize } from '../../utils/formatters'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import type { TreeNode } from '../../types/tree'

export default function NodeDetail() {
  const { tree } = useTree()
  const { '*': rawPath } = useParams()
  const pathParts = (rawPath ?? '').split('/').filter(Boolean)

  if (!tree || pathParts.length === 0) {
    return <NotFound path={rawPath ?? ''} />
  }

  const node = findNodeByPath(tree, pathParts)

  if (!node) {
    return <NotFound path={rawPath ?? ''} />
  }

  return (
    <div className="space-y-5 animate-slide-up">
      <Breadcrumb pathParts={pathParts} />

      {node.type === 'file' ? (
        <FileDetail node={node} path={rawPath ?? ''} />
      ) : (
        <FolderDetail node={node} path={rawPath ?? ''} />
      )}
    </div>
  )
}

function FileDetail({ node, path }: { readonly node: Extract<TreeNode, { type: 'file' }>; readonly path: string }) {
  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/25 shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <h1 className="text-base font-semibold text-gray-100 break-all flex-1">{node.name}</h1>
        <span className="text-[11px] font-medium text-blue-400/80 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
          file
        </span>
      </div>

      <dl>
        <DetailRow label="Name"      value={node.name} />
        <DetailRow label="Size"      value={formatSize(node.size)} />
        <DetailRow label="Full path" value={path} mono />
      </dl>
    </div>
  )
}

function FolderDetail({ node, path }: { readonly node: Extract<TreeNode, { type: 'folder' }>; readonly path: string }) {
  const totalSize = getTotalSize(node)

  return (
    <div className="space-y-4">
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/25 shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </div>
          <h1 className="text-base font-semibold text-gray-100 break-all flex-1">{node.name}</h1>
          <span className="text-[11px] font-medium text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
            folder
          </span>
        </div>

        <dl>
          <DetailRow label="Name"            value={node.name} />
          <DetailRow label="Direct children" value={String(node.children.length)} />
          <DetailRow label="Total size"      value={formatSize(totalSize)} />
          <DetailRow label="Full path"       value={path} mono />
        </dl>
      </div>

      {node.children.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06]">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contents</h2>
          </div>
          <ul>
            {node.children
              .slice()
              .sort(sortNodes)
              .map((child) => {
                const childPath = `${path}/${child.name}`
                return (
                  <li key={child.name} className="border-b border-white/[0.04] last:border-0">
                    <Link
                      to={`/tree/${childPath}`}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/[0.03] transition-colors duration-100 group"
                    >
                      {child.type === 'file' ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400/70 shrink-0">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500/60 shrink-0">
                          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                      )}
                      <span className="text-sm text-gray-400 group-hover:text-gray-100 transition-colors flex-1 truncate">
                        {child.name}
                      </span>
                      {child.type === 'file' && (
                        <span className="text-[11px] text-gray-700 font-mono tabular-nums">
                          {formatSize(child.size)}
                        </span>
                      )}
                      {child.type === 'folder' && (
                        <span className="text-[11px] text-gray-700">
                          {child.children.length} item{child.children.length === 1 ? '' : 's'}
                        </span>
                      )}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-700 group-hover:text-gray-500 transition-colors shrink-0">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>
      )}
    </div>
  )
}

function DetailRow({ label, value, mono = false }: { readonly label: string; readonly value: string; readonly mono?: boolean }) {
  return (
    <div className="px-5 py-3 flex items-start gap-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.015] transition-colors">
      <dt className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider w-32 shrink-0 pt-px">{label}</dt>
      <dd className={`text-sm text-gray-300 break-all leading-relaxed ${mono ? 'font-mono text-xs text-gray-400' : ''}`}>
        {value}
      </dd>
    </div>
  )
}

function NotFound({ path }: { readonly path: string }) {
  return (
    <div className="flex flex-col items-center justify-center pt-20 text-center animate-fade-in">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="text-gray-400 font-medium mb-1">Node not found</p>
      {path && <p className="text-xs text-gray-700 font-mono mb-5 max-w-xs truncate">{path}</p>}
      <Link
        to="/tree"
        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
      >
        ← Back to tree
      </Link>
    </div>
  )
}
