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
    <div className="space-y-5">
      <Breadcrumb pathParts={pathParts} />

      {node.type === 'file' ? (
        <FileDetail node={node} path={rawPath ?? ''} />
      ) : (
        <FolderDetail node={node} path={rawPath ?? ''} />
      )}
    </div>
  )
}

function FileDetail({ node, path }: { node: Extract<TreeNode, { type: 'file' }>; path: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-400 shrink-0"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <h1 className="text-lg font-semibold text-gray-100 break-all">{node.name}</h1>
        <span className="ml-auto text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
          file
        </span>
      </div>

      <dl className="divide-y divide-gray-800">
        <DetailRow label="Name" value={node.name} />
        <DetailRow label="Size" value={formatSize(node.size)} />
        <DetailRow label="Full path" value={path} mono />
      </dl>
    </div>
  )
}

function FolderDetail({
  node,
  path,
}: {
  node: Extract<TreeNode, { type: 'folder' }>
  path: string
}) {
  const totalSize = getTotalSize(node)

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-yellow-400 shrink-0"
          >
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <h1 className="text-lg font-semibold text-gray-100 break-all">{node.name}</h1>
          <span className="ml-auto text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
            folder
          </span>
        </div>

        <dl className="divide-y divide-gray-800">
          <DetailRow label="Name" value={node.name} />
          <DetailRow label="Direct children" value={String(node.children.length)} />
          <DetailRow label="Total size" value={formatSize(totalSize)} />
          <DetailRow label="Full path" value={path} mono />
        </dl>
      </div>

      {node.children.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-800">
            <h2 className="text-sm font-medium text-gray-300">Contents</h2>
          </div>
          <ul className="divide-y divide-gray-800/60">
            {node.children
              .slice()
              .sort(sortNodes)
              .map((child) => {
                const childPath = `${path}/${child.name}`
                return (
                  <li key={child.name}>
                    <Link
                      to={`/tree/${childPath}`}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-800/60 transition-colors group"
                    >
                      {child.type === 'file' ? (
                        <svg
                          width="14"
                          height="14"
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
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-yellow-600 shrink-0"
                        >
                          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                      )}
                      <span className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors flex-1">
                        {child.name}
                      </span>
                      {child.type === 'file' && (
                        <span className="text-xs text-gray-600">
                          {formatSize(child.size)}
                        </span>
                      )}
                      {child.type === 'folder' && (
                        <span className="text-xs text-gray-600">
                          {child.children.length} item
                          {child.children.length !== 1 ? 's' : ''}
                        </span>
                      )}
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-600 group-hover:text-gray-400 transition-colors"
                      >
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

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="px-5 py-3 flex items-start gap-4">
      <dt className="text-sm text-gray-500 w-32 shrink-0">{label}</dt>
      <dd className={`text-sm text-gray-200 break-all ${mono ? 'font-mono' : ''}`}>
        {value}
      </dd>
    </div>
  )
}

function NotFound({ path }: { path: string }) {
  return (
    <div className="flex flex-col items-center justify-center pt-24 text-center">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-gray-700 mb-4"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p className="text-gray-400 mb-1">Node not found</p>
      {path && <p className="text-sm text-gray-600 font-mono mb-4">{path}</p>}
      <Link to="/tree" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
        Back to tree
      </Link>
    </div>
  )
}
