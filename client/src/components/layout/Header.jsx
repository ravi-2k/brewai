import { Menu } from 'lucide-react'
import Logo from './Logo'

// Fixed top bar of the app. The menu button only exists below the `lg` breakpoint,
// because on desktop the sidebar is always visible.
export default function Header({ onMenuClick }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="cursor-pointer rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
      >
        <Menu className="size-6" />
      </button>
      <Logo to="/app/dashboard" />
    </header>
  )
}
