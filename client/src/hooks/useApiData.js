import { useEffect, useState } from 'react'

/**
 * Loads data once when the component appears (GET requests for page content).
 *
 *   const { data, setData, loading, error } = useApiData(getCreations)
 *
 * `fetcher` must be a stable function (defined outside components), otherwise
 * it would reload on every render. `setData` lets a page update the local
 * copy itself, e.g. flipping a like instantly before the server confirms.
 *
 * (useAsyncAction is for the opposite case: work the USER triggers, like a submit.)
 */
export function useApiData(fetcher) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    // If the user leaves the page before the response arrives, ignore the result.
    let cancelled = false

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((err) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message })
      })

    return () => {
      cancelled = true
    }
  }, [fetcher])

  const setData = (updater) =>
    setState((current) => ({
      ...current,
      data: typeof updater === 'function' ? updater(current.data) : updater,
    }))

  return { ...state, setData }
}
