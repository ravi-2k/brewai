import { cn } from '../../utils/cn'

/** Centered icon + message, shown where content will appear later. */
export default function EmptyState({ icon: Icon, title, description, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-12 text-center', className)}>
      {Icon && (
        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <Icon className="size-7" />
        </div>
      )}
      <p className="text-base font-medium text-slate-700">{title}</p>
      {description && <p className="mt-1 max-w-xs text-sm text-slate-500">{description}</p>}
    </div>
  )
}
