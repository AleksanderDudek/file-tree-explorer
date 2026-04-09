import type { TreeNode } from '../../types/tree'
import { validateTreeNode } from '../../utils/treeUtils'

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result
      if (typeof text === 'string') resolve(text)
      else reject(new Error('Failed to read file'))
    }
    reader.onerror = () => reject(new Error('File read error'))
    reader.readAsText(file)
  })
}

export function parseAndValidateTree(json: string): TreeNode {
  const parsed: unknown = JSON.parse(json)
  if (!validateTreeNode(parsed)) {
    throw new Error(
      'Invalid tree structure. Each node needs a "name" and "type" ("file" or "folder"). Files need "size", folders need "children".',
    )
  }
  return parsed
}
