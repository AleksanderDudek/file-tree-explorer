import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { TreeNode } from '../../types/tree'
import { sortNodes } from '../../utils/treeUtils'
import { GUIDE_INDENT_PX } from './TreeNodeItem.consts'

interface TreeNodeItemProps {
  readonly node: TreeNode
  readonly path: string
  readonly depth: number
}

export default function TreeNodeItem({ node, path, depth }: TreeNodeItemProps) {
  const [isExpanded, setIsExpanded] = useState(depth < 2)
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const isActive = pathname === `/tree/${path}`

  const activeClass = 'bg-blue-500/12 text-blue-300 shadow-[inset_2px_0_0_rgba(96,165,250,0.55)]'
  const idleClass   = 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.045]'

  if (node.type === 'file') {
    return (
      <Link
        to={`/tree/${path}`}
        className={`flex items-center gap-2 py-[5px] pl-2 pr-2 rounded-md text-[13px] transition-all duration-100 ${isActive ? activeClass : idleClass}`}
      >
        <FileIcon />
        <span className="truncate">{node.name}</span>
      </Link>
    )
  }

  return (
    <div>
      <div className={`flex items-center gap-1 py-[5px] pl-2 pr-2 rounded-md text-[13px] transition-all duration-100 ${isActive ? activeClass : idleClass}`}>
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="p-0.5 rounded-sm hover:bg-white/10 shrink-0 text-gray-600 hover:text-gray-300 transition-colors duration-100"
          aria-label={isExpanded ? t('treeNode.collapseFolder') : t('treeNode.expandFolder')}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`}
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <Link to={`/tree/${path}`} className="flex items-center gap-2 flex-1 min-w-0">
          <FolderIcon isOpen={isExpanded} />
          <span className="truncate">{node.name}</span>
        </Link>
      </div>

      {isExpanded && (
        <div
          className="border-l border-white/[0.07]"
          style={{ marginLeft: GUIDE_INDENT_PX }}
        >
          {node.children.length === 0 ? (
            <div className="py-1 pl-3 text-[11px] text-gray-700 italic">
              {t('treeNode.emptyFolder')}
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

function FileIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400/80 shrink-0">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function FolderIcon({ isOpen }: { readonly isOpen: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`shrink-0 transition-colors duration-150 ${isOpen ? 'text-amber-400' : 'text-amber-600/70'}`}
    >
      {isOpen ? (
        <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1H5v7l2-7h14l-2.5 9A2 2 0 0 1 16.5 19z" />
      ) : (
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      )}
    </svg>
  )
}
