import { useUser } from '@clerk/react'

/**
 * The signed-in user in the small shape our UI needs. Components import this
 * hook instead of Clerk directly, so Clerk-specific field names live in one
 * place (and are easy to swap or mock in tests).
 */
export function useCurrentUser() {
  const { isLoaded, user } = useUser()

  if (!isLoaded || !user) return { isLoaded, user: null }

  const email = user.primaryEmailAddress?.emailAddress ?? ''
  return {
    isLoaded,
    user: {
      name: user.fullName || user.username || email,
      firstName: user.firstName || user.username || 'there',
      email,
      imageUrl: user.imageUrl,
    },
  }
}
