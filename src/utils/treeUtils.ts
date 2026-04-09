import type { TreeNode, SearchResult } from '../types/tree'

/**
 * Finds a node by its path parts starting from the root.
 * pathParts = ['root', 'src', 'components'] for the URL /tree/root/src/components
 */
export function findNodeByPath(root: TreeNode, pathParts: string[]): TreeNode | null {
  if (pathParts.length === 0) return null
  if (pathParts[0] !== root.name) return null
  if (pathParts.length === 1) return root

  if (root.type !== 'folder') return null

  const [, ...remaining] = pathParts
  const child = root.children.find((c) => c.name === remaining[0])
  if (!child) return null

  return findNodeByPath(child, remaining)
}

/**
 * Recursively searches nodes by name, returning matching nodes with their full paths.
 * The path starts from the root node's name (e.g., "root/src/components/Button.tsx").
 */
export function searchNodes(
  root: TreeNode,
  query: string,
  parentPath = '',
): SearchResult[] {
  const results: SearchResult[] = []
  const currentPath = parentPath ? `${parentPath}/${root.name}` : root.name

  if (root.name.toLowerCase().includes(query.toLowerCase())) {
    results.push({ node: root, path: currentPath })
  }

  if (root.type === 'folder') {
    for (const child of root.children) {
      results.push(...searchNodes(child, query, currentPath))
    }
  }

  return results
}

/**
 * Sorts nodes with folders first, then alphabetically within each group.
 */
export function sortNodes(a: TreeNode, b: TreeNode): number {
  if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
  return a.name.localeCompare(b.name)
}

/**
 * Returns the total size of all files in a subtree.
 */
export function getTotalSize(node: TreeNode): number {
  if (node.type === 'file') return node.size
  return node.children.reduce((sum, child) => sum + getTotalSize(child), 0)
}

/**
 * Validates that the input conforms to the TreeNode structure.
 */
export function validateTreeNode(data: unknown): data is TreeNode {
  if (typeof data !== 'object' || data === null) return false
  const obj = data as Record<string, unknown>
  if (typeof obj.name !== 'string' || obj.name.length === 0) return false

  if (obj.type === 'file') {
    return typeof obj.size === 'number' && obj.size >= 0
  }

  if (obj.type === 'folder') {
    return (
      Array.isArray(obj.children) && obj.children.every(validateTreeNode)
    )
  }

  return false
}
