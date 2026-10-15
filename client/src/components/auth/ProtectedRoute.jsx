import { Outlet } from 'react-router-dom'
import { RedirectToSignIn, useAuth } from '@clerk/react'
import { Loader2 } from 'lucide-react'

/**
 * Route guard. Wrap routes in <Route element={<ProtectedRoute />}> and only
 * signed-in users reach the children (rendered through <Outlet />).
 *
 * Order matters: until `isLoaded` is true, Clerk doesn't know yet whether
 * there is a session, so we must wait instead of treating the user as signed out.
 */
export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status" aria-label="Loading">
        <Loader2 className="size-8 animate-spin text-brand-600" />
      </div>
    )
  }

  // Sends the visitor to Clerk's sign-in page, then back to the page they wanted.
  if (!isSignedIn) return <RedirectToSignIn />

  return <Outlet />
}
