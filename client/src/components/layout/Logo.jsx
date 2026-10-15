import { Link } from 'react-router-dom'
import { FlaskConical } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Brand mark + name. Reused in the NavBar, Footer and the app Header, so a
 * rebrand is a one-file change.
 */
export default function Logo({ to = '/', className }) {
  return (
    <Link to={to} className={cn('inline-flex items-center gap-2.5', className)} aria-label="BrewAI home">
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
        <FlaskConical className="size-5" />
      </span>
      <span className="text-lg font-bold tracking-tight">BrewAI</span>
    </Link>
  )
}
