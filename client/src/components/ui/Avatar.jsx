import { cn } from '../../utils/cn'

/** "Ravi Patel" -> "RP" */
function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

/** Profile picture, falling back to the user's initials on a gradient circle. */
export default function Avatar({ name, imageUrl, className }) {
  if (imageUrl) {
    return <img src={imageUrl} alt={name} className={cn('size-10 rounded-full object-cover', className)} />
  }
  return (
    <span
      aria-label={name}
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-fuchsia-500 text-sm font-semibold text-white',
        className,
      )}
    >
      {getInitials(name)}
    </span>
  )
}
