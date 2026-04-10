import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Folder, FolderOpen, ChevronRight, AlertCircle, ArrowLeft,
} from 'lucide-react'
import { useTree } from '../../context/TreeContext'
import { findNodeByPath, getTotalSize, sortNodes } from '../../utils/treeUtils'
import { formatSize } from '../../utils/formatters'
import { getFileIcon } from '../../utils/fileIcons'
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
  const { t } = useTranslation()
  const { Icon, className: iconColor } = getFileIcon(node.name)
  return (
    <div className="card overflow-hidden card-hover">
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 shrink-0">
          <Icon size={16} className={iconColor} />
        </div>
        <h1 className="text-base font-semibold text-gray-100 break-all flex-1">{node.name}</h1>
        <span className="text-[11px] font-medium text-blue-400/80 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
          {t('nodeDetail.typeBadge.file')}
        </span>
      </div>

      <dl>
        <DetailRow label={t('nodeDetail.label.name')}     value={node.name} />
        <DetailRow label={t('nodeDetail.label.size')}     value={formatSize(node.size)} />
        <DetailRow label={t('nodeDetail.label.fullPath')} value={path} mono />
      </dl>
    </div>
  )
}

function FolderDetail({ node, path }: { readonly node: Extract<TreeNode, { type: 'folder' }>; readonly path: string }) {
  const { t } = useTranslation()
  const totalSize = getTotalSize(node)

  return (
    <div className="space-y-4">
      <div className="card overflow-hidden card-hover">
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
            <FolderOpen size={16} className="text-amber-400" />
          </div>
          <h1 className="text-base font-semibold text-gray-100 break-all flex-1">{node.name}</h1>
          <span className="text-[11px] font-medium text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
            {t('nodeDetail.typeBadge.folder')}
          </span>
        </div>

        <dl>
          <DetailRow label={t('nodeDetail.label.name')}           value={node.name} />
          <DetailRow label={t('nodeDetail.label.directChildren')} value={String(node.children.length)} />
          <DetailRow label={t('nodeDetail.label.totalSize')}      value={formatSize(totalSize)} />
          <DetailRow label={t('nodeDetail.label.fullPath')}       value={path} mono />
        </dl>
      </div>

      {node.children.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06]">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('nodeDetail.contents')}</h2>
          </div>
          <ul>
            {node.children
              .slice()
              .sort(sortNodes)
              .map((child) => {
                const childPath = `${path}/${child.name}`
                return (
                  <li key={child.name} className="border-b border-white/[0.04] last:border-0 stagger-item">
                    <Link
                      to={`/tree/${childPath}`}
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/[0.04] transition-all duration-100 group"
                    >
                      {child.type === 'file' ? (
                        (() => {
                          const { Icon, className: c } = getFileIcon(child.name)
                          return <Icon size={13} className={`shrink-0 ${c} opacity-80`} />
                        })()
                      ) : (
                        <Folder size={14} className="text-amber-500/60 shrink-0 group-hover:text-amber-400 transition-colors" />
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
                          {t('nodeDetail.items', { count: child.children.length })}
                        </span>
                      )}
                      <ChevronRight size={12} className="text-gray-700 group-hover:text-gray-500 transition-colors shrink-0" />
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
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center pt-20 text-center animate-fade-in">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-5 shadow-card">
        <AlertCircle size={28} className="text-gray-600" />
      </div>
      <p className="text-gray-400 font-medium mb-1">{t('nodeDetail.notFound')}</p>
      {path && <p className="text-xs text-gray-700 font-mono mb-6 max-w-xs truncate">{path}</p>}
      <Link
        to="/tree"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
      >
        <ArrowLeft size={14} />
        {t('nodeDetail.backToTree')}
      </Link>
    </div>
  )
}
