import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createElement } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { TreeProvider } from '../../context/TreeContext'
import NodeDetail from './NodeDetail'

function renderAtPath(path: string, withTree = false) {
  if (withTree) {
    const tree = {
      name: 'root',
      type: 'folder',
      children: [{ name: 'index.ts', type: 'file', size: 512 }],
    }
    localStorage.setItem('file-tree-data', JSON.stringify(tree))
  }

  const result = render(
    createElement(MemoryRouter, { initialEntries: [path] },
      createElement(TreeProvider, null,
        createElement(Routes, null,
          createElement(Route, { path: '/tree/*', element: createElement(NodeDetail) })
        )
      )
    )
  )

  if (withTree) localStorage.removeItem('file-tree-data')
  return result
}

describe('NodeDetail', () => {
  it('shows not found when no tree is loaded', () => {
    renderAtPath('/tree/root/index.ts')
    expect(screen.getByText(/node not found/i)).toBeInTheDocument()
  })

  it('shows not found for an unknown path', () => {
    renderAtPath('/tree/root/missing.ts', true)
    expect(screen.getByText(/node not found/i)).toBeInTheDocument()
  })

  it('renders file detail for a known file path', () => {
    renderAtPath('/tree/root/index.ts', true)
    expect(screen.getByText('index.ts')).toBeInTheDocument()
    expect(screen.getByText('file')).toBeInTheDocument()
  })

  it('renders breadcrumb for nested path', () => {
    renderAtPath('/tree/root/index.ts', true)
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument()
  })
})
