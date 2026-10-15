// Choices shown as pills in the tool forms. Keeping them here (not inside the
// pages) means the backend and the UI can share the exact same values later.
const toOptions = (labels) => labels.map((label) => ({ value: label, label }))

export const ARTICLE_LENGTHS = [
  { value: 'small', label: 'Small', hint: '500-800 words' },
  { value: 'medium', label: 'Medium', hint: '800-1200 words' },
  { value: 'large', label: 'Large', hint: '1200+ words' },
]

export const TITLE_CATEGORIES = toOptions([
  'General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food',
])

export const IMAGE_STYLES = toOptions([
  'Realistic', 'Ghibli Style', 'Anime Style', 'Cartoon Style', 'Fantasy Style', '3D Style', 'Portrait Style',
])
