import { useEffect, useMemo } from 'react'

/**
 * Turns a File into a temporary URL the browser can display in <img src>.
 * The URL holds memory, so we release it when the file changes or the
 * component unmounts (the cleanup function of useEffect).
 */
export function useObjectUrl(file) {
  const url = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [url])

  return url
}
