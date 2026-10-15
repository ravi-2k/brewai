import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '../ui'
import StartCreatingButton from '../auth/StartCreatingButton'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative blurred glow behind the text. aria-hidden: screen readers skip it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-100 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-20 text-center sm:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-inset ring-brand-100">
          <Sparkles className="size-4" />
          Six AI tools. One workspace.
        </span>

        <h1 className="mt-8 text-5xl font-bold tracking-tight text-balance sm:text-7xl">
          Brew your next idea with{' '}
          <span className="bg-gradient-to-r from-brand-600 to-fuchsia-500 bg-clip-text text-transparent">
            AI
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 text-balance">
          Write articles, craft blog titles, generate stunning images, clean up photos and get your
          resume reviewed, all without leaving one beautifully simple app.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <StartCreatingButton size="lg" />
          <Button as="a" href="#tools" variant="secondary" size="lg">
            Explore tools
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
