import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/**
 * Full-screen overlay dialog.
 *  - createPortal renders it at <body> level, so no parent's CSS (overflow,
 *    z-index, transforms) can clip or hide it.
 *  - Closes on Escape key or backdrop click.
 *  - Locks page scrolling while open.
 */
export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Cleanup runs when the modal closes/unmounts: undo what we did above.
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        // Stop clicks inside the dialog from bubbling to the backdrop (which would close it).
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-full w-full max-w-3xl overflow-auto rounded-2xl bg-white p-4 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 cursor-pointer rounded-full bg-white/90 p-1.5 text-slate-600 shadow ring-1 ring-slate-200 hover:text-slate-900"
        >
          <X className="size-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
