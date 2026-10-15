import { useId } from 'react'
import { cn } from '../../utils/cn'

const CONTROL_STYLES =
  'w-full rounded-xl border-0 bg-white px-4 py-2.5 text-sm text-slate-900 ring-1 ring-inset ' +
  'placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-brand-500'

/**
 * Label + control + optional hint/error, wired together for accessibility.
 * `useId` generates a unique id so the <label htmlFor> always matches the control.
 *
 * `multiline` switches the control from <input> to <textarea>, so one
 * component covers both and every form in the app looks identical.
 */
export default function Field({ label, hint, error, multiline = false, className, ...controlProps }) {
  const id = useId()
  const Control = multiline ? 'textarea' : 'input'

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <Control
        id={id}
        rows={multiline ? 4 : undefined}
        aria-invalid={Boolean(error)}
        className={cn(CONTROL_STYLES, multiline && 'resize-none', error ? 'ring-red-400' : 'ring-slate-200')}
        {...controlProps}
      />
      {(error || hint) && (
        <p className={cn('mt-1.5 text-xs', error ? 'text-red-600' : 'text-slate-500')}>
          {error || hint}
        </p>
      )}
    </div>
  )
}
