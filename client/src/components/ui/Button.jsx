import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

const VARIANTS = {
  primary:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-700 focus-visible:outline-brand-600',
  secondary:
    'bg-white text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus-visible:outline-slate-400',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-slate-400',
}

const SIZES = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-base gap-2',
}

/**
 * Props
 *  - variant: 'primary' | 'secondary' | 'ghost'
 *  - size: 'sm' | 'md' | 'lg'
 *  - icon: a lucide icon COMPONENT (not an element), e.g. icon={Sparkles}
 *  - loading: shows a spinner and disables the button
 *  - as: render as another element/component, e.g. as={Link} to="/app"
 */
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  className,
  children,
  disabled,
  ...rest
}) {
  const isDisabled = disabled || loading
  // Only real <button>s understand the `disabled` attribute.
  const disabledProps = Component === 'button' ? { disabled: isDisabled } : {}

  return (
    <Component
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-full font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...disabledProps}
      {...rest}
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : Icon && <Icon className="size-4" />}
      {children}
    </Component>
  )
}
