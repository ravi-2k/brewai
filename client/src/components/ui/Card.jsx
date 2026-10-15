import { cn } from '../../utils/cn'

/**
 * A plain white rounded surface. Pass `interactive` for a hover lift effect
 * (used for clickable cards). `as` lets it render as <li>, <section>, etc.
 */
export default function Card({
  as: Component = 'div',
  interactive = false,
  className,
  children,
  ...rest
}) {
  return (
    <Component
      className={cn(
        'rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card',
        interactive && 'transition duration-200 hover:-translate-y-0.5 hover:border-slate-300',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
