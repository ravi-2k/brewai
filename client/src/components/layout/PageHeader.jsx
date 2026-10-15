import { useDocumentTitle } from '../../hooks/useDocumentTitle'

// Title block at the top of every app page. Also updates the browser tab title.
export default function PageHeader({ title, description }) {
  useDocumentTitle(title)

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      {description && <p className="mt-1.5 text-slate-500">{description}</p>}
    </div>
  )
}
