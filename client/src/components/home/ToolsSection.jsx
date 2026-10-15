import { TOOLS } from '../../config/tools'
import ToolCard from './ToolCard'

export default function ToolsSection() {
  return (
    // scroll-mt offsets the sticky navbar when jumping to #tools.
    <section id="tools" className="scroll-mt-16 bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to create</h2>
          <p className="mt-4 text-lg text-slate-600">
            Pick a tool, describe what you want, and let BrewAI do the heavy lifting.
          </p>
        </div>

        {/* 1 column on phones, 2 on tablets, 3 on desktop. */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
