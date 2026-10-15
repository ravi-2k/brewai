// "2026-10-14T09:30:00Z" -> "Oct 14, 2026, 3:00 PM" (in the viewer's timezone)
const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' })

export const formatDateTime = (isoString) => formatter.format(new Date(isoString))
