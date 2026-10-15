import { cn } from '../../utils/cn'

/** An on/off switch. Controlled: pass `checked` and `onChange(nextBoolean)`. */
export default function Toggle({ checked, onChange, label, className }) {
  return (
    <label className={cn('flex cursor-pointer items-center justify-between gap-3', className)}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
          checked ? 'bg-brand-600' : 'bg-slate-200',
        )}
      >
        <span
          className={cn(
            'absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform',
            checked && 'translate-x-5',
          )}
        />
      </button>
    </label>
  )
}
