import { useEffect } from 'react'

// Sets the browser tab title, e.g. "Write Article | BrewAI".
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | BrewAI` : 'BrewAI - Create with AI'
  }, [title])
}
