import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TreeProvider } from './context/TreeContext'
import Home from './pages/Home'
import TreeLayout from './pages/TreeLayout'
import NodeDetail from './pages/NodeDetail'

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
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-600 select-none pt-24">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="mb-4 text-gray-700"
      >
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
      <p className="text-sm">Select a file or folder to view details</p>
    </div>
  )
}
