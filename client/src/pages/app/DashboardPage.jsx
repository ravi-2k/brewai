import { useState } from 'react'
import { Layers, Loader2 } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import StatCard from '../../components/dashboard/StatCard'
import CreationCard from '../../components/dashboard/CreationCard'
import { EmptyState } from '../../components/ui'
import { useApiData } from '../../hooks/useApiData'
import { getCreations } from '../../services/api'

export default function DashboardPage() {
  // Which accordion row is open (null = none). One piece of state -> only one open at a time.
  const [openId, setOpenId] = useState(null)

  // Fetches on mount. The server already returns newest-first and the true total
  // (the list itself is capped, so `total` can be larger than `creations.length`).
  const { data, loading, error } = useApiData(getCreations)

  return (
    <>
      <PageHeader title="Dashboard" description="Everything you've brewed so far." />

      {loading && (
        <div className="flex justify-center py-16" role="status" aria-label="Loading creations">
          <Loader2 className="size-8 animate-spin text-brand-600" />
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      {data && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Total Creations" value={data.total} icon={Layers} />
          </div>

          <section className="mt-10">
            <h2 className="mb-4 text-lg font-semibold">Recent Creations</h2>
            {data.creations.length === 0 ? (
              <EmptyState
                icon={Layers}
                title="No creations yet"
                description="Pick a tool from the sidebar to make your first one."
              />
            ) : (
              <div className="space-y-3">
                {data.creations.map((creation) => (
                  <CreationCard
                    key={creation.id}
                    creation={creation}
                    open={openId === creation.id}
                    onToggle={() => setOpenId(openId === creation.id ? null : creation.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </>
  )
}
