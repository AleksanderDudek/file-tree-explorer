import { useParams } from 'react-router-dom'

interface NodePathResult {
  rawPath: string
  pathParts: string[]
}

export function useNodePath(): NodePathResult {
  const { '*': raw } = useParams()
  const rawPath = raw ?? ''
  const pathParts = rawPath.split('/').filter(Boolean)
  return { rawPath, pathParts }
}
