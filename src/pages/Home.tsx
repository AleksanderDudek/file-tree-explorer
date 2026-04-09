import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTree } from '../context/TreeContext'
import { validateTreeNode } from '../utils/treeUtils'
import Layout from '../components/Layout'

const EXAMPLE_JSON = JSON.stringify(
  {
    name: 'root',
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          { name: 'index.ts', type: 'file', size: 1024 },
          {
            name: 'components',
            type: 'folder',
            children: [{ name: 'Button.tsx', type: 'file', size: 512 }],
          },
        ],
      },
      { name: 'package.json', type: 'file', size: 300 },
    ],
  },
  null,
  2,
)

export default function Home() {
  const { tree, setTree } = useTree()
  const navigate = useNavigate()
  const [jsonInput, setJsonInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleLoad() {
    setError(null)
    const trimmed = jsonInput.trim()
    if (!trimmed) {
      setError('Please paste or upload a JSON file.')
      return
    }
    try {
      const parsed: unknown = JSON.parse(trimmed)
      if (!validateTreeNode(parsed)) {
        setError(
          'Invalid tree structure. Each node needs a "name" and "type" ("file" or "folder"). Files need "size", folders need "children".',
        )
        return
      }
      setTree(parsed)
      navigate('/tree')
    } catch {
      setError('Invalid JSON — please check for syntax errors.')
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result
      if (typeof text === 'string') {
        setJsonInput(text)
        setError(null)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            FileTree Explorer
          </h1>
          <p className="text-gray-400">
            Paste or upload a JSON file to visualize your directory structure
          </p>
        </div>

        {/* Already have a tree loaded */}
        {tree && (
          <div className="mb-4 flex items-center gap-3 p-3 bg-green-900/20 border border-green-800/50 rounded-lg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-green-400 shrink-0"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <p className="text-sm text-green-300 flex-1">
              A tree is already loaded.
            </p>
            <Link
              to="/tree"
              className="text-sm text-green-400 hover:text-green-300 underline transition-colors"
            >
              View it →
            </Link>
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="json-input"
              className="text-sm font-medium text-gray-300"
            >
              JSON Input
            </label>
            <button
              type="button"
              onClick={() => {
                setJsonInput(EXAMPLE_JSON)
                setError(null)
              }}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Load example
            </button>
          </div>

          <textarea
            id="json-input"
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value)
              setError(null)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleLoad()
            }}
            placeholder={`{\n  "name": "root",\n  "type": "folder",\n  "children": []\n}`}
            rows={14}
            spellCheck={false}
            className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 font-mono resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600"
          />

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-900/20 border border-red-800/50 rounded-lg">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-red-400 shrink-0 mt-0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleLoad}
              disabled={!jsonInput.trim()}
              className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              Visualize Tree
            </button>

            <label className="py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-lg transition-colors border border-gray-700 whitespace-nowrap cursor-pointer">
              Upload JSON
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="mt-5 p-4 bg-gray-900/40 border border-gray-800 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">
            Expected format
          </p>
          <pre className="text-xs text-gray-500 font-mono leading-relaxed overflow-x-auto">
            {`{ "name": "root", "type": "folder", "children": [\n    { "name": "app.ts", "type": "file", "size": 2048 }\n  ]\n}`}
          </pre>
        </div>
      </div>
    </Layout>
  )
}
