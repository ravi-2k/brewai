import { NavLink } from 'react-router-dom'
import { useClerk } from '@clerk/react'
import { LogOut } from 'lucide-react'
import { Avatar } from '../ui'
import { APP_NAV } from '../../config/tools'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { cn } from '../../utils/cn'

/**
 * Navigation column.
 *  - Desktop (lg+): always visible, fixed to the left under the header.
 *  - Mobile: slides in from the left when `open` is true (a "drawer").
 * `-translate-x-full` pushes it off-screen; `lg:translate-x-0` pins it on desktop.
 */
export default function Sidebar({ open, onClose }) {
  const { signOut, openUserProfile } = useClerk()
  // The route guard guarantees a signed-in user, but Clerk may still be hydrating the object.
  const { user } = useCurrentUser()

  return (
    <aside
      className={cn(
        'fixed bottom-0 left-0 top-16 z-30 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300',
        open ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0',
      )}
    >
      <div className="px-6 pb-2 pt-6">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Welcome back</p>
        <p className="mt-0.5 truncate text-base font-semibold">{user?.firstName}</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {APP_NAV.map(({ id, title, icon: Icon }) => (
          <NavLink
            key={id}
            to={`/app/${id}`}
            onClick={onClose}
            // NavLink hands us `isActive`, so we can style the current page.
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              )
            }
          >
            <Icon className="size-5" />
            {title}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-slate-200 p-4">
        {/* Avatar + name open Clerk's built-in profile modal (details, photo upload, security). */}
        <button
          type="button"
          onClick={() => {
            onClose() // close the mobile drawer so it doesn't sit behind the modal
            openUserProfile()
          }}
          aria-label="Open your profile"
          className="-m-2 flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-slate-100"
        >
          <Avatar name={user?.name} imageUrl={user?.imageUrl} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => signOut({ redirectUrl: '/' })}
          aria-label="Log out"
          className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <LogOut className="size-5" />
        </button>
      </div>
    </aside>
  )
}
