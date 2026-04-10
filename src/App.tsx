import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FolderOpen } from 'lucide-react'
import { TreeProvider } from './context/TreeContext'
import Home from './pages/Home/Home'
import TreeLayout from './pages/TreeLayout/TreeLayout'
import NodeDetail from './pages/NodeDetail/NodeDetail'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <TreeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tree" element={<TreeLayout />}>
            <Route index element={<TreePlaceholder />} />
            <Route path="*" element={<NodeDetail />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TreeProvider>
    </BrowserRouter>
  )
}

function TreePlaceholder() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-600 select-none pt-24 animate-fade-in-slow">
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-2xl bg-amber-500/5 blur-xl scale-150" />
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-bounce-subtle">
          <FolderOpen size={28} className="text-gray-700" />
        </div>
      </div>
      <p className="text-sm text-gray-600">{t('app.selectNode')}</p>
      <div className="mt-3 flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1 h-1 rounded-full bg-gray-700 animate-pulse-slow"
            style={{ animationDelay: `${i * 300}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
