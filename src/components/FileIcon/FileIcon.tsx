import { getFileIcon } from '../../utils/fileIcons'

interface FileIconProps {
  readonly name: string
  readonly size?: number
  /** Override the color class (e.g. when node is active) */
  readonly colorOverride?: string
  readonly className?: string
}

export default function FileIcon({ name, size = 13, colorOverride, className = '' }: FileIconProps) {
  const { Icon, className: iconColor } = getFileIcon(name)
  return <Icon size={size} className={`shrink-0 ${colorOverride ?? iconColor} ${className}`} />
}
