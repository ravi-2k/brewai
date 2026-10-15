import { Link } from 'react-router-dom'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import Logo from './Logo'
import { Button } from '../ui'

const NAV_LINKS = [{ label: 'Tools', href: '/#tools' }]

// Sticky top bar. `backdrop-blur` + translucent white gives the frosted-glass look.
export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

        <div className="flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:block"
            >
              {link.label}
            </a>
          ))}

          {/* <Show> renders its children only when the condition matches. */}
          <Show when="signed-out">
            {/* The Clerk button wrappers hand their click handler to the child, so our Button works inside them. */}
            <SignInButton mode="modal" forceRedirectUrl="/app/dashboard">
              <Button variant="ghost" size="sm">Sign in</Button>
            </SignInButton>
            <SignUpButton mode="modal" forceRedirectUrl="/app/dashboard">
              <Button size="sm">Get Started</Button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <Button as={Link} to="/app/dashboard" variant="secondary" size="sm">
              Dashboard
            </Button>
            <UserButton />
          </Show>
        </div>
      </nav>
    </header>
  )
}
