import {
  FileText,
  Hash,
  ImagePlus,
  Eraser,
  Scissors,
  FileSearch,
  Users,
  LayoutDashboard,
} from 'lucide-react'

/**
 * Single source of truth for every AI tool.
 * The Home page cards, the sidebar links and the routes are all built from
 * this list, so adding a tool later means editing one place.
 */
export const TOOLS = [
  {
    id: 'write-article',
    title: 'Write Article',
    description: 'Turn a topic into a well-structured article in your chosen length.',
    icon: FileText,
  },
  {
    id: 'blog-titles',
    title: 'Blog Titles',
    description: 'Get catchy, click-worthy titles for any keyword and category.',
    icon: Hash,
  },
  {
    id: 'generate-image',
    title: 'Generate Image',
    description: 'Describe a scene and pick a style: realistic, anime, 3D and more.',
    icon: ImagePlus,
  },
  {
    id: 'remove-background',
    title: 'Remove Background',
    description: 'Cut out the background from any photo in one click.',
    icon: Eraser,
  },
  {
    id: 'remove-object',
    title: 'Remove Object',
    description: 'Describe an unwanted object and make it disappear from your photo.',
    icon: Scissors,
  },
  {
    id: 'review-resume',
    title: 'Review Resume',
    description: 'Upload your resume and get clear, actionable feedback.',
    icon: FileSearch,
  },
]

// Links shown in the app sidebar (Dashboard and Community are not "AI tools").
export const APP_NAV = [
  { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
  ...TOOLS,
  { id: 'community', title: 'Community', icon: Users },
]

export const getToolById = (id) => TOOLS.find((tool) => tool.id === id)
