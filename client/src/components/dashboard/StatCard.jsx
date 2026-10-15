import { Card } from '../ui'

// A single headline number with an icon, e.g. "Total Creations 7".
export default function StatCard({ label, value, icon: Icon }) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-4xl font-bold tracking-tight">{value}</p>
      </div>
      <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <Icon className="size-7" />
      </span>
    </Card>
  )
}
