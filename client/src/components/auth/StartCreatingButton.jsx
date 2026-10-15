import { Link } from 'react-router-dom'
import { Show, SignUpButton } from '@clerk/react'
import { Sparkles } from 'lucide-react'
import { Button } from '../ui'

/**
 * Main call-to-action. Signed in: a normal link into the app.
 * Signed out: opens Clerk's sign-up modal, then lands on the dashboard.
 */
export default function StartCreatingButton({ children = 'Start Creating Now', ...buttonProps }) {
  return (
    <>
      <Show when="signed-in">
        <Button as={Link} to="/app/dashboard" icon={Sparkles} {...buttonProps}>
          {children}
        </Button>
      </Show>
      <Show when="signed-out">
        <SignUpButton mode="modal" forceRedirectUrl="/app/dashboard">
          <Button icon={Sparkles} {...buttonProps}>
            {children}
          </Button>
        </SignUpButton>
      </Show>
    </>
  )
}
