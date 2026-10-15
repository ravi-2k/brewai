import { Heart } from 'lucide-react'
import { Card } from '../ui'
import { cn } from '../../utils/cn'

export function LikeButton({ liked, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={liked}
      aria-label={liked ? 'Unlike' : 'Like'}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 text-sm text-slate-500 transition-colors hover:bg-slate-100"
    >
      <Heart className={cn('size-5 transition-colors', liked && 'fill-rose-500 text-rose-500')} />
      {count}
    </button>
  )
}

/** Image tile with prompt + like button. Clicking the image opens it larger. */
export default function CommunityCard({ image, onOpen, onToggleLike }) {
  return (
    <Card className="overflow-hidden p-0">
      <button type="button" onClick={onOpen} aria-label={`Open image: ${image.prompt}`} className="block w-full cursor-zoom-in">
        <img src={image.imageUrl} alt={image.prompt} loading="lazy" className="aspect-square w-full object-cover" />
      </button>
      <div className="space-y-2 p-4">
        <p className="line-clamp-2 text-sm text-slate-600">{image.prompt}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">by {image.authorName}</span>
          <LikeButton liked={image.likedByMe} count={image.likes} onClick={onToggleLike} />
        </div>
      </div>
    </Card>
  )
}
