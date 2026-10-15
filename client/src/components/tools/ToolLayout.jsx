import { Card } from '../ui'

/** Two columns on desktop (form left, result right), stacked on mobile. */
export default function ToolLayout({ children }) {
  return <div className="grid items-start gap-6 lg:grid-cols-2">{children}</div>
}

/** One side of the layout: a card with an icon + heading, then its content. */
export function ToolPanel({ icon: Icon, title, children }) {
  return (
    <Card className="min-h-[24rem]">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <Icon className="size-5" />
        </span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </Card>
  )
}
