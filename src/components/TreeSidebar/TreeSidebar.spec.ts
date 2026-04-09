import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TreeProvider } from '../../context/TreeContext'
import TreeSidebar from './TreeSidebar'

describe('TreeSidebar', () => {
  it('renders nothing when no tree is loaded', () => {
    const { container } = render(
      createElement(MemoryRouter, null,
        createElement(TreeProvider, null,
          createElement(TreeSidebar)
        )
      )
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a search input when tree is available via localStorage', () => {
    const tree = { name: 'root', type: 'folder', children: [] }
    localStorage.setItem('file-tree-data', JSON.stringify(tree))

    render(
      createElement(MemoryRouter, null,
        createElement(TreeProvider, null,
          createElement(TreeSidebar)
        )
      )
    )

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
    localStorage.removeItem('file-tree-data')
  })
})
