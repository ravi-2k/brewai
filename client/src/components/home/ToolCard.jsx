import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Card } from '../ui'

/**
 * Presentational card: it receives one `tool` object and just renders it.
 * Note `icon: Icon` renames the prop so we can use it as <Icon /> (components
 * must start with a capital letter in JSX).
 */
export default function ToolCard({ tool }) {
  const { id, title, description, icon: Icon } = tool

  return (
    <Card
      as={Link}
      to={`/app/${id}`}
      interactive
      className="group flex flex-col gap-4 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
          <Icon className="size-6" />
        </span>
        <ArrowUpRight className="size-5 text-slate-300 transition-colors group-hover:text-brand-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{description}</p>
      </div>
    </Card>
  )
}
