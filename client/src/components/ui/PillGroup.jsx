import { cn } from '../../utils/cn'

/**
 * A single-choice selector rendered as pills (like radio buttons).
 *
 *  <PillGroup
 *    label="Article length"
 *    options={[{ value: 'small', label: 'Small', hint: '500-800 words' }]}
 *    value={length}
 *    onChange={setLength}
 *  />
 *
 * It is a "controlled" component: the parent owns `value`, we just report
 * clicks through `onChange`.
 */
export default function PillGroup({ label, options, value, onChange, className }) {
  return (
    <div className={className}>
      {label && <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>}
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                'cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 ring-inset transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
                selected
                  ? 'bg-brand-50 text-brand-700 ring-brand-500'
                  : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50',
              )}
            >
              {option.label}
              {option.hint && (
                <span className="ml-1.5 font-normal text-slate-400">{option.hint}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
