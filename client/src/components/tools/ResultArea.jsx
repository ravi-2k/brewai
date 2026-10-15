import { Loader2 } from 'lucide-react'
import { EmptyState } from '../ui'

/**
 * Decides what the right-hand panel shows. Same 4 states on every tool page:
 *   loading -> spinner  |  error -> message  |  no result yet -> empty state  |  result -> children
 */
export default function ResultArea({
  loading,
  error,
  hasResult,
  loadingText = 'Brewing your result...',
  emptyIcon,
  emptyTitle,
  emptyDescription,
  children,
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500" role="status">
        <Loader2 className="size-8 animate-spin text-brand-600" />
        <p className="text-sm">{loadingText}</p>
      </div>
    )
  }

  if (error) {
    return (
      <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
        {error}
      </p>
    )
  }

  if (!hasResult) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />
  }

  return children
}
