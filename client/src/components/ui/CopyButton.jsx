import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../../utils/cn'

// Copies `text` to the clipboard and flashes a checkmark for 2 seconds.
export default function CopyButton({ text, label = 'Copy', className }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // Clipboard can be blocked (e.g. insecure context); fail quietly.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900',
        className,
      )}
    >
      {copied ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
      {copied ? 'Copied' : label}
    </button>
  )
}
