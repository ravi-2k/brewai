import { CopyButton } from '../ui'

/**
 * Renders the tiny markdown subset our mock API returns:
 * "# " = title, "## " = section heading, anything else = paragraph.
 * (The real AI will return richer markdown; we can swap in a markdown
 * library at that point.)
 */
export default function ArticleView({ text }) {
  const blocks = text.split('\n').filter((line) => line.trim())

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <CopyButton text={text} label="Copy article" />
      </div>
      <article className="space-y-3 text-slate-700">
        {blocks.map((line, index) => {
          if (line.startsWith('## ')) {
            return <h3 key={index} className="pt-3 text-lg font-semibold text-slate-900">{line.slice(3)}</h3>
          }
          if (line.startsWith('# ')) {
            return <h2 key={index} className="text-2xl font-bold text-slate-900">{line.slice(2)}</h2>
          }
          return <p key={index} className="leading-relaxed">{line}</p>
        })}
      </article>
    </div>
  )
}
