import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TreeProvider } from '../../context/TreeContext'
import Home from './Home'
import { parseAndValidateTree, readFileAsText } from './Home.service'

function renderHome() {
  return render(
    createElement(MemoryRouter, null,
      createElement(TreeProvider, null,
        createElement(Home)
      )
    )
  )
}

describe('Home', () => {
  it('renders the JSON textarea', () => {
    renderHome()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders the Load example button', () => {
    renderHome()
    expect(screen.getByRole('button', { name: /load example/i })).toBeInTheDocument()
  })

  it('disables Visualize Tree button when input is empty', () => {
    renderHome()
    expect(screen.getByRole('button', { name: /visualize tree/i })).toBeDisabled()
  })

  it('enables Visualize Tree button when input has content', () => {
    renderHome()
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '{}' } })
    expect(screen.getByRole('button', { name: /visualize tree/i })).not.toBeDisabled()
  })

  it('shows error message for invalid JSON', () => {
    renderHome()
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'not json' } })
    fireEvent.click(screen.getByRole('button', { name: /visualize tree/i }))
    expect(screen.getByText(/invalid json/i)).toBeInTheDocument()
  })

  it('loads example JSON into textarea', () => {
    renderHome()
    fireEvent.click(screen.getByRole('button', { name: /load example/i }))
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    expect(textarea.value).toContain('"name": "root"')
  })
})

describe('Home.service', () => {
  describe('parseAndValidateTree', () => {
    it('parses valid file node JSON', () => {
      const node = parseAndValidateTree('{"name":"a","type":"file","size":0}')
      expect(node).toEqual({ name: 'a', type: 'file', size: 0 })
    })

    it('parses valid folder node JSON', () => {
      const node = parseAndValidateTree('{"name":"root","type":"folder","children":[]}')
      expect(node).toEqual({ name: 'root', type: 'folder', children: [] })
    })

    it('throws on invalid JSON syntax', () => {
      expect(() => parseAndValidateTree('{')).toThrow()
    })

    it('throws on structurally invalid tree', () => {
      expect(() => parseAndValidateTree('{"name":"x","type":"unknown"}')).toThrow(/invalid tree/i)
    })
  })

  describe('readFileAsText', () => {
    it('resolves with file contents', async () => {
      const file = new File(['hello world'], 'test.json', { type: 'application/json' })
      const result = await readFileAsText(file)
      expect(result).toBe('hello world')
    })

    it('rejects when FileReader encounters an error', async () => {
      const mockReader = {
        onload: null as ((e: ProgressEvent<FileReader>) => void) | null,
        onerror: null as ((e: ProgressEvent<FileReader>) => void) | null,
        readAsText: vi.fn().mockImplementation(function (this: typeof mockReader) {
          this.onerror?.(new ProgressEvent('error') as ProgressEvent<FileReader>)
        }),
        result: null,
      }
      vi.spyOn(globalThis, 'FileReader').mockImplementation(() => mockReader as unknown as FileReader)
      const file = new File([''], 'bad.json')
      await expect(readFileAsText(file)).rejects.toThrow()
      vi.restoreAllMocks()
    })
  })
})
