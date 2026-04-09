import type { TreeNode } from '../../types/tree'
import { validateTreeNode } from '../../utils/treeUtils'

export type ParseErrorCode = 'invalidJson' | 'invalidStructure'

export class TreeParseError extends Error {
  constructor(public readonly code: ParseErrorCode) {
    super(code)
  }
}

export function readFileAsText(file: File): Promise<string> {
  return file.text()
}

export function parseAndValidateTree(json: string): TreeNode {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    throw new TreeParseError('invalidJson')
  }
  if (!validateTreeNode(parsed)) {
    throw new TreeParseError('invalidStructure')
  }
  return parsed
}
