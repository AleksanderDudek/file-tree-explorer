import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import type { TreeNode } from '../../types/tree'
import TreeNodeItem from './TreeNodeItem'

const fileNode: TreeNode = { name: 'index.ts', type: 'file', size: 1024 }

const folderNode: TreeNode = {
  name: 'src',
  type: 'folder',
  children: [
    { name: 'z-file.ts', type: 'file', size: 512 },
    { name: 'a-sub', type: 'folder', children: [] },
  ],
}

function renderNode(node: TreeNode, path: string, depth = 0) {
  return render(
    createElement(MemoryRouter, null,
      createElement(TreeNodeItem, { node, path, depth })
    )
  )
}

describe('TreeNodeItem', () => {
  it('renders a file node as a link', () => {
    renderNode(fileNode, 'root/index.ts')
    expect(screen.getByRole('link', { name: /index\.ts/i })).toBeInTheDocument()
  })

  it('renders a folder node with an expand/collapse button', () => {
    renderNode(folderNode, 'root/src', 3)
    expect(screen.getByRole('button', { name: /expand folder/i })).toBeInTheDocument()
  })

  it('expands folder on button click when initially collapsed', () => {
    renderNode(folderNode, 'root/src', 3)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByText('z-file.ts')).toBeInTheDocument()
  })

  it('collapses folder on second button click', () => {
    renderNode(folderNode, 'root/src', 0)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.queryByText('z-file.ts')).not.toBeInTheDocument()
  })

  it('sorts folders before files in children', () => {
    renderNode(folderNode, 'root/src', 0)
    const links = screen.getAllByRole('link')
    const names = links.map((l) => l.textContent?.trim())
    expect(names.indexOf('a-sub')).toBeLessThan(names.indexOf('z-file.ts'))
  })
})
