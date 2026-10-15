import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

/**
 * Shell for every logged-in page. React Router renders the matching child
 * route (Dashboard, Write Article, ...) where <Outlet /> sits, so the Header
 * and Sidebar stay mounted while only the page content changes.
 */
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = () => setSidebarOpen(false)

  // Let Esc close the mobile drawer.
  useEffect(() => {
    if (!sidebarOpen) return
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSidebarOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      {/* Dark overlay behind the mobile drawer; clicking it closes the drawer. */}
      {sidebarOpen && (
        <div
          aria-hidden="true"
          onClick={closeSidebar}
          className="fixed inset-0 z-20 bg-slate-900/40 lg:hidden"
        />
      )}

      {/* pt-16 clears the fixed header, lg:pl-64 clears the fixed sidebar. */}
      <main className="pt-16 lg:pl-64">
        <div className="mx-auto max-w-6xl p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
