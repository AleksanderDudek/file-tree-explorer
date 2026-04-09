import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TreeProvider } from '../../context/TreeContext'
import TreeLayout from './TreeLayout'

describe('TreeLayout', () => {
  it('renders nothing when no tree is loaded', () => {
    const { container } = render(
      createElement(MemoryRouter, null,
        createElement(TreeProvider, null,
          createElement(TreeLayout)
        )
      )
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('renders sidebar and outlet when tree is loaded via localStorage', () => {
    const tree = {
      name: 'root',
      type: 'folder',
      children: [{ name: 'file.ts', type: 'file', size: 100 }],
    }
    localStorage.setItem('file-tree-data', JSON.stringify(tree))

    const { container } = render(
      createElement(MemoryRouter, null,
        createElement(TreeProvider, null,
          createElement(TreeLayout)
        )
      )
    )

    expect(container.querySelector('aside')).toBeInTheDocument()
    localStorage.removeItem('file-tree-data')
  })
})
