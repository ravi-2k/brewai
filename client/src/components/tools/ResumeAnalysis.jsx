import { CheckCircle2, TrendingUp } from 'lucide-react'

function BulletList({ icon: Icon, iconClass, title, items }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-slate-900">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
            <Icon className={`mt-0.5 size-4 shrink-0 ${iconClass}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ResumeAnalysis({ analysis }) {
  const { score, summary, strengths, improvements } = analysis

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-end justify-between">
          <p className="text-sm font-medium text-slate-500">Overall score</p>
          <p className="text-3xl font-bold">{score}<span className="text-lg text-slate-400">/100</span></p>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500" style={{ width: `${score}%` }} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{summary}</p>
      </div>
      <BulletList icon={CheckCircle2} iconClass="text-emerald-600" title="Strengths" items={strengths} />
      <BulletList icon={TrendingUp} iconClass="text-amber-600" title="Suggested improvements" items={improvements} />
    </div>
  )
}
