import { memo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronRight, Folder, FolderOpen } from 'lucide-react'
import { clsx } from 'clsx'
import type { TreeNode } from '../../types/tree'
import { sortNodes } from '../../utils/treeUtils'
import FileIcon from '../FileIcon/FileIcon'
import { GUIDE_INDENT_PX } from './TreeNodeItem.consts'

interface TreeNodeItemProps {
  readonly node: TreeNode
  readonly path: string
  readonly depth: number
}

const TreeNodeItem = memo(function TreeNodeItem({ node, path, depth }: TreeNodeItemProps) {
  const [isExpanded, setIsExpanded] = useState(depth < 2)
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const isActive = pathname === `/tree/${path}`

  const rowClass = clsx(
    'flex items-center gap-1 py-[5px] pl-2 pr-2 rounded-md text-[13px] transition-all duration-100',
    isActive
      ? 'bg-blue-500/12 text-blue-300 shadow-[inset_2px_0_0_rgba(96,165,250,0.55)]'
      : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.045]',
  )

  if (node.type === 'file') {
    return (
      <Link to={`/tree/${path}`} className={clsx(rowClass, 'gap-2')}>
        <FileIcon
          name={node.name}
          size={13}
          colorOverride={isActive ? 'text-blue-400' : undefined}
        />
        <span className="truncate">{node.name}</span>
      </Link>
    )
  }

  return (
    <div>
      <div className={rowClass}>
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="p-0.5 rounded-sm hover:bg-white/10 shrink-0 text-gray-600 hover:text-gray-300 transition-colors duration-100"
          aria-label={isExpanded ? t('treeNode.collapseFolder') : t('treeNode.expandFolder')}
        >
          <ChevronRight
            size={10}
            className={clsx('transition-transform duration-200', isExpanded && 'rotate-90')}
          />
        </button>

        <Link to={`/tree/${path}`} className="flex items-center gap-2 flex-1 min-w-0">
          {isExpanded
            ? <FolderOpen size={14} className={clsx('shrink-0 transition-colors duration-150', isActive ? 'text-amber-300' : 'text-amber-400')} />
            : <Folder    size={14} className={clsx('shrink-0 transition-colors duration-150', isActive ? 'text-amber-300' : 'text-amber-600/70')} />
          }
          <span className="truncate">{node.name}</span>
        </Link>
      </div>

      {isExpanded && (
        <div className="border-l border-white/[0.07]" style={{ marginLeft: GUIDE_INDENT_PX }}>
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
})

export default TreeNodeItem
