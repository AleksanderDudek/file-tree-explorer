import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Upload, Play, CheckCircle, AlertCircle, FolderTree,
  Search, GitBranch, Zap,
} from 'lucide-react'
import { useTree } from '../../context/TreeContext'
import Layout from '../../components/Layout/Layout'
import { EXAMPLES } from './Home.consts'
import { parseAndValidateTree, readFileAsText, TreeParseError } from './Home.service'

export default function Home() {
  const { tree, setTree } = useTree()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [jsonInput, setJsonInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleLoad() {
    setError(null)
    const trimmed = jsonInput.trim()
    if (!trimmed) {
      setError(t('home.error.emptyInput'))
      return
    }
    try {
      const parsed = parseAndValidateTree(trimmed)
      setTree(parsed)
      navigate('/tree')
    } catch (e) {
      if (e instanceof TreeParseError) {
        setError(t(`home.error.${e.code}`))
      } else {
        setError(t('home.error.unexpected'))
      }
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
      setError(t('home.error.fileRead'))
    }
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto">

        {/* ── Hero ─────────────────────────────────────── */}
        <div className="mb-10 text-center relative">
          <div className="bg-hero-glow absolute inset-x-0 -top-16 h-80 pointer-events-none" />

          {/* Floating icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-6 animate-float shadow-glow-blue-sm">
            <FolderTree size={28} className="text-blue-400" />
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-400/90 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-slow shrink-0" />{' '}
              {t('home.badge')}
            </div>
          </div>

          <h1 className="text-shimmer text-4xl font-bold tracking-tight mb-3">
            {t('home.title')}
          </h1>
          <p className="text-gray-500 text-[15px] leading-relaxed whitespace-pre-line">
            {t('home.subtitle')}
          </p>

          {/* Feature pills */}
          <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
            {[
              { icon: Search,    label: 'Search nodes' },
              { icon: GitBranch, label: 'Visual tree' },
              { icon: Zap,       label: 'Instant parse' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-[11px] text-gray-600 bg-white/[0.03] border border-white/[0.06] rounded-full px-2.5 py-1">
                <Icon size={10} className="text-gray-600" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Tree already loaded banner ────────────────── */}
        {tree && (
          <div className="mb-5 flex items-center gap-3 px-4 py-3 bg-emerald-500/8 border border-emerald-500/20 rounded-xl animate-fade-in">
            <CheckCircle size={16} className="text-emerald-400 shrink-0" />
            <p className="text-sm text-emerald-300/90 flex-1">{t('home.treeLoaded')}</p>
            <Link
              to="/tree"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              {t('home.viewIt')}
            </Link>
          </div>
        )}

        {/* ── Main card ────────────────────────────────── */}
        <div className="card p-6 space-y-4 card-hover">
          <div className="flex items-center justify-between">
            <label htmlFor="json-input" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t('home.jsonInput.label')}
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
              aria-label={t('home.loadExample')}
            >
              <option value="" disabled>{t('home.loadExample')}</option>
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
            placeholder={t('home.jsonInput.placeholder')}
            rows={14}
            spellCheck={false}
            className="input-field w-full p-3.5 text-sm font-mono resize-y leading-relaxed"
          />

          {error && (
            <div className="flex items-start gap-3 px-4 py-3 bg-red-500/8 border border-red-500/20 rounded-xl animate-fade-in">
              <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300/90">{error}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleLoad}
              disabled={!jsonInput.trim()}
              className="btn-primary flex-1 py-2.5 px-4 text-sm flex items-center justify-center gap-2"
            >
              <Play size={13} className="shrink-0" />
              {t('home.visualizeTree')}
            </button>
            <label className="btn-secondary py-2.5 px-4 text-sm whitespace-nowrap cursor-pointer flex items-center gap-2">
              <Upload size={13} className="shrink-0" />
              {t('home.uploadJson')}{' '}
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
            {t('home.expectedFormat')}
          </p>
          <pre className="text-xs text-gray-600 font-mono leading-relaxed overflow-x-auto">
            {`{ "name": "root", "type": "folder", "children": [\n    { "name": "app.ts", "type": "file", "size": 2048 }\n  ]\n}`}
          </pre>
        </div>

      </div>
    </Layout>
  )
}
