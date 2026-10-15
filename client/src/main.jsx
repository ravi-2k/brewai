import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.jsx'

// Vite only exposes env vars that start with VITE_ to browser code. The
// publishable key is safe to expose; the secret key (CLERK_SECRET_KEY) is not
// prefixed, so Vite keeps it out of the bundle. It belongs on the backend.
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
