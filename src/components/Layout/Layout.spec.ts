import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TreeProvider } from '../../context/TreeContext'
import Layout from './Layout'

function renderLayout(children = createElement('div', null, 'test content')) {
  return render(
    createElement(MemoryRouter, null,
      createElement(TreeProvider, null,
        createElement(Layout, null, children)
      )
    )
  )
}

describe('Layout', () => {
  it('renders the brand link', () => {
    renderLayout()
    expect(screen.getByRole('link', { name: /filetree explorer/i })).toBeInTheDocument()
  })

  it('renders children inside main', () => {
    renderLayout()
    expect(screen.getByText('test content')).toBeInTheDocument()
  })

  it('does not show Clear or View Tree buttons when no tree is loaded', () => {
    renderLayout()
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /view tree/i })).not.toBeInTheDocument()
  })
})
