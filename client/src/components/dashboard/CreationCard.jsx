import { AccordionItem } from '../ui'
import { getToolById } from '../../config/tools'
import { formatDateTime } from '../../utils/formatDate'

/**
 * One row in "Recent Creations". Collapsed: title, tool, date.
 * Expanded: the image if the creation has one, otherwise the text.
 */
export default function CreationCard({ creation, open, onToggle }) {
  const tool = getToolById(creation.tool)
  const Icon = tool.icon

  return (
    <AccordionItem
      open={open}
      onToggle={onToggle}
      header={
        <div className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">{creation.title}</p>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
              <span className="font-medium text-brand-700">{tool.title}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={creation.createdAt}>{formatDateTime(creation.createdAt)}</time>
            </p>
          </div>
        </div>
      }
    >
      {creation.imageUrl && (
        <img src={creation.imageUrl} alt={creation.title} className="mb-4 max-h-96 w-full rounded-xl object-cover" />
      )}
      {/* Text tools fill `content`; image tools only have the `prompt` (what the user asked for). */}
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
        {creation.content || creation.prompt}
      </p>
    </AccordionItem>
  )
}
