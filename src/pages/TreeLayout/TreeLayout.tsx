import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useTree } from '../../context/TreeContext'
import Layout from '../../components/Layout/Layout'
import TreeSidebar from '../../components/TreeSidebar/TreeSidebar'

export default function TreeLayout() {
  const { tree } = useTree()
  const navigate = useNavigate()

  useEffect(() => {
    if (!tree) {
      navigate('/', { replace: true })
    }
  }, [tree, navigate])

  if (!tree) return null

  return (
    <Layout>
      <div className="flex gap-5" style={{ minHeight: 'calc(100vh - 8rem)' }}>
        <TreeSidebar />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </Layout>
  )
}
