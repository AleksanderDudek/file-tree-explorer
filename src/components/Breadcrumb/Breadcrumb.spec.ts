import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import Breadcrumb from './Breadcrumb'

function renderBreadcrumb(pathParts: string[]) {
  return render(
    createElement(MemoryRouter, null,
      createElement(Breadcrumb, { pathParts })
    )
  )
}

describe('Breadcrumb', () => {
  it('renders all path parts', () => {
    renderBreadcrumb(['root', 'src', 'components'])
    expect(screen.getByText('root')).toBeInTheDocument()
    expect(screen.getByText('src')).toBeInTheDocument()
    expect(screen.getByText('components')).toBeInTheDocument()
  })

  it('renders intermediate parts as links', () => {
    renderBreadcrumb(['root', 'src', 'index.ts'])
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveTextContent('root')
    expect(links[1]).toHaveTextContent('src')
  })

  it('renders the last part as plain text, not a link', () => {
    renderBreadcrumb(['root', 'src'])
    expect(screen.queryByRole('link', { name: 'src' })).not.toBeInTheDocument()
    expect(screen.getByText('src')).toBeInTheDocument()
  })

  it('renders a single part with no links', () => {
    renderBreadcrumb(['root'])
    expect(screen.queryAllByRole('link')).toHaveLength(0)
    expect(screen.getByText('root')).toBeInTheDocument()
  })
})
