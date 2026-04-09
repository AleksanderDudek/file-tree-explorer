import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { TreeNode } from '../types/tree'

interface TreeNodeItemProps {
  node: TreeNode
  path: string
  depth: number
}

const INDENT_PX = 14

export default function TreeNodeItem({ node, path, depth }: TreeNodeItemProps) {
  const [isExpanded, setIsExpanded] = useState(depth < 2)
  const { pathname } = useLocation()
  const isActive = pathname === `/tree/${path}`

  const indentStyle = { paddingLeft: depth * INDENT_PX + 8 }

  if (node.type === 'file') {
    return (
      <Link
        to={`/tree/${path}`}
        style={indentStyle}
        className={`flex items-center gap-2 py-1 pr-2 rounded text-sm transition-colors ${
          isActive
            ? 'bg-blue-500/20 text-blue-300'
            : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
        }`}
      >
        <FileIcon />
        <span className="truncate">{node.name}</span>
      </Link>
    )
  }

  return (
    <div>
      <div
        style={indentStyle}
        className={`flex items-center gap-1.5 py-1 pr-2 rounded text-sm transition-colors ${
          isActive
            ? 'bg-blue-500/20 text-blue-300'
            : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
        }`}
      >
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="p-0.5 rounded hover:bg-gray-700 transition-colors shrink-0 text-gray-500 hover:text-gray-300"
          aria-label={isExpanded ? 'Collapse folder' : 'Expand folder'}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`}
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <Link
          to={`/tree/${path}`}
          className="flex items-center gap-2 flex-1 min-w-0"
        >
          <FolderIcon isOpen={isExpanded} />
          <span className="truncate">{node.name}</span>
        </Link>
      </div>

      {isExpanded && (
        <div>
          {node.children.length === 0 ? (
            <div
              style={{ paddingLeft: (depth + 1) * INDENT_PX + 8 }}
              className="py-1 text-xs text-gray-600 italic"
            >
              empty folder
            </div>
          ) : (
            node.children
              .slice()
              .sort(sortNodes)
              .map((child) => (
                <TreeNodeItem
                  key={child.name}
                  node={child}
                  path={`${path}/${child.name}`}
                  depth={depth + 1}
                />
              ))
          )}
        </div>
      )}
    </div>
  )
}

/** Folders first, then files — each group sorted alphabetically */
function sortNodes(a: TreeNode, b: TreeNode): number {
  if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
  return a.name.localeCompare(b.name)
}

function FileIcon() {
  return (
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
  )
}

function FolderIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`shrink-0 ${isOpen ? 'text-yellow-400' : 'text-yellow-600'}`}
    >
      {isOpen ? (
        <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1H5v7l2-7h14l-2.5 9A2 2 0 0 1 16.5 19z" />
      ) : (
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      )}
    </svg>
  )
}
