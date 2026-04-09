import { createContext, useContext, useState, type ReactNode } from 'react'
import type { TreeNode } from '../types/tree'

const STORAGE_KEY = 'file-tree-data'

interface TreeContextValue {
  tree: TreeNode | null
  setTree: (tree: TreeNode | null) => void
}

const TreeContext = createContext<TreeContextValue | null>(null)

export function TreeProvider({ children }: { children: ReactNode }) {
  const [tree, setTreeState] = useState<TreeNode | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as TreeNode) : null
    } catch {
      return null
    }
  })

  function setTree(newTree: TreeNode | null) {
    setTreeState(newTree)
    if (newTree) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTree))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <TreeContext.Provider value={{ tree, setTree }}>
      {children}
    </TreeContext.Provider>
  )
}

export function useTree(): TreeContextValue {
  const ctx = useContext(TreeContext)
  if (!ctx) throw new Error('useTree must be used within TreeProvider')
  return ctx
}
