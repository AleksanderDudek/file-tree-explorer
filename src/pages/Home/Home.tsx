import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTree } from '../../context/TreeContext'
import Layout from '../../components/Layout/Layout'
import { EXAMPLES } from './Home.consts'
import { parseAndValidateTree, readFileAsText } from './Home.service'

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
      const parsed = parseAndValidateTree(trimmed)
      setTree(parsed)
      navigate('/tree')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred.')
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    try {
      const text = await readFileAsText(file)
      setJsonInput(text)
      setError(null)
    } catch {
      setError('Failed to read file.')
    }
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto">

        {/* ── Hero ─────────────────────────────────────── */}
        <div className="mb-10 text-center relative">
          <div className="bg-hero-glow absolute inset-x-0 -top-16 h-80 pointer-events-none" />

          <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-400/90 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-slow" />{' '}
            JSON-powered file tree explorer
          </div>

          <h1 className="text-gradient text-4xl font-bold tracking-tight mb-3">
            FileTree Explorer
          </h1>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Paste or upload a JSON file to visualize<br />your directory structure
          </p>
        </div>

        {/* ── Tree already loaded banner ────────────────── */}
        {tree && (
          <div className="mb-5 flex items-center gap-3 px-4 py-3 bg-emerald-500/8 border border-emerald-500/20 rounded-xl animate-fade-in">
            <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-400">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm text-emerald-300/90 flex-1">A tree is already loaded.</p>
            <Link
              to="/tree"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              View it →
            </Link>
          </div>
        )}

        {/* ── Main card ────────────────────────────────── */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="json-input" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              JSON Input
            </label>
            <select
              defaultValue=""
              onChange={(e) => {
                const idx = Number.parseInt(e.target.value)
                if (!Number.isNaN(idx)) {
                  setJsonInput(EXAMPLES[idx].json)
                  setError(null)
                }
                e.target.value = ''
              }}
              className="text-xs bg-transparent text-blue-400 hover:text-blue-300 cursor-pointer focus:outline-none transition-colors"
              aria-label="Load example"
            >
              <option value="" disabled>Load example…</option>
              {EXAMPLES.map((ex, i) => (
                <option key={ex.name} value={i}>
                  {ex.name} — {ex.description}
                </option>
              ))}
            </select>
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
            className="input-field w-full p-3.5 text-sm font-mono resize-y leading-relaxed"
          />

          {error && (
            <div className="flex items-start gap-3 px-4 py-3 bg-red-500/8 border border-red-500/20 rounded-xl animate-fade-in">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400 shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-red-300/90">{error}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleLoad}
              disabled={!jsonInput.trim()}
              className="btn-primary flex-1 py-2.5 px-4 text-sm"
            >
              Visualize Tree
            </button>
            <label className="btn-secondary py-2.5 px-4 text-sm whitespace-nowrap cursor-pointer">
              Upload JSON{' '}
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* ── Format hint ──────────────────────────────── */}
        <div className="mt-4 px-4 py-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02]">
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-2">
            Expected format
          </p>
          <pre className="text-xs text-gray-600 font-mono leading-relaxed overflow-x-auto">
            {`{ "name": "root", "type": "folder", "children": [\n    { "name": "app.ts", "type": "file", "size": 2048 }\n  ]\n}`}
          </pre>
        </div>

      </div>
    </Layout>
  )
}
