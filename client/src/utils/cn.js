/**
 * Joins class names, skipping falsy values.
 * cn('a', isActive && 'b', undefined) -> 'a b' (when isActive is true)
 * Lets us build conditional Tailwind classes without messy template strings.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
