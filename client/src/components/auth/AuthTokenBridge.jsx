import { useEffect } from 'react'
import { useAuth } from '@clerk/react'
import { setTokenGetter } from '../../services/api'

/**
 * Renders nothing. Its only job: give the plain (non-React) api.js functions
 * access to Clerk's getToken(), which only exists inside React components.
 * getToken() returns a fresh short-lived session token each time, so we never store one.
 */
export default function AuthTokenBridge() {
  const { getToken } = useAuth()

  useEffect(() => {
    setTokenGetter(() => getToken())
  }, [getToken])

  return null
}
