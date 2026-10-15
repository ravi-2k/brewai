import { Download } from 'lucide-react'
import { Button } from '../ui'
import { cn } from '../../utils/cn'
import { toDownloadUrl } from '../../utils/downloadUrl'

// Shows a result image with a download button. `transparent` paints the
// chequered background so removed areas are visible.
export default function ResultImage({ src, alt, transparent = false }) {
  return (
    <div className="space-y-4">
      <div className={cn('overflow-hidden rounded-xl ring-1 ring-slate-200', transparent && 'bg-checkerboard')}>
        <img src={src} alt={alt} className="mx-auto max-h-[28rem] w-full object-contain" />
      </div>
      <Button as="a" href={toDownloadUrl(src)} download="brewai-result" variant="secondary" size="sm" icon={Download}>
        Download
      </Button>
    </div>
  )
}
