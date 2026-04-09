import type { TreeNode } from '../../types/tree'
import { validateTreeNode } from '../../utils/treeUtils'

export function readFileAsText(file: File): Promise<string> {
  return file.text()
}

export function parseAndValidateTree(json: string): TreeNode {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    throw new Error('Invalid JSON — please check for syntax errors.')
  }
  if (!validateTreeNode(parsed)) {
    throw new Error(
      'Invalid tree structure. Each node needs a "name" and "type" ("file" or "folder"). Files need "size", folders need "children".',
    )
  }
  return parsed
}
