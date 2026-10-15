import { Link } from 'react-router-dom'
import Logo from './Logo'
import { TOOLS } from '../../config/tools'

// Computed once at load, not on every render.
const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
            BrewAI is a toolbox of AI helpers for creators: write articles, generate images,
            polish photos and sharpen your resume, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:justify-items-end">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Tools</h3>
            <ul className="mt-4 space-y-3">
              {TOOLS.map((tool) => (
                <li key={tool.id}>
                  <Link to={`/app/${tool.id}`} className="text-sm text-slate-500 transition-colors hover:text-slate-900">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Explore</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/app/community" className="text-sm text-slate-500 transition-colors hover:text-slate-900">Community</Link></li>
              <li><Link to="/app/dashboard" className="text-sm text-slate-500 transition-colors hover:text-slate-900">Dashboard</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        © {CURRENT_YEAR} BrewAI. All rights reserved.
      </div>
    </footer>
  )
}
