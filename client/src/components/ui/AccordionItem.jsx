import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * One collapsible row. Controlled: parent passes `open` and `onToggle`,
 * so the parent can decide "only one open at a time" if it wants.
 *
 * The animation trick: a CSS grid whose row goes from 0fr to 1fr. This
 * animates to the content's natural height without measuring it in JS.
 */
export default function AccordionItem({ header, open, onToggle, children, className }) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card', className)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center gap-4 p-5 text-left transition-colors hover:bg-slate-50"
      >
        <div className="min-w-0 flex-1">{header}</div>
        <ChevronDown
          className={cn('size-5 shrink-0 text-slate-400 transition-transform', open && 'rotate-180')}
        />
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-100 p-5">{children}</div>
        </div>
      </div>
    </div>
  )
}
