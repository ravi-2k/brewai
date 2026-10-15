import { useCallback, useState } from 'react'

/**
 * Wraps an async function (an API call) and tracks its lifecycle.
 *
 *   const { run, loading, result, error } = useAsyncAction(generateArticle)
 *   run({ topic, length })   // call it from your submit handler
 *
 * Every tool page needs exactly this, so it lives in one place. When the real
 * backend arrives, the pages stay untouched; only the function passed in changes.
 */
export function useAsyncAction(action) {
  const [state, setState] = useState({ loading: false, result: null, error: null })

  const run = useCallback(
    async (...args) => {
      setState({ loading: true, result: null, error: null })
      try {
        const result = await action(...args)
        setState({ loading: false, result, error: null })
      } catch (err) {
        setState({ loading: false, result: null, error: err.message || 'Something went wrong.' })
      }
    },
    [action],
  )

  return { ...state, run }
}
