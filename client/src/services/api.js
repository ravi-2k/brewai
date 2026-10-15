/**
 * The REAL API layer. It replaces mockApi.js and keeps the same function names,
 * so the tool pages barely change. Each function:
 *   1. sends a request to our Express server,
 *   2. unwraps the response into the shape the page already expects.
 */

// Clerk's getToken() is a React hook result, but these are plain functions. A
// small component (AuthTokenBridge) hands us the getter once the app starts.
let getToken = async () => null
export const setTokenGetter = (fn) => {
  getToken = fn
}

// Empty in development (the Vite proxy handles /api). In production, set
// VITE_API_URL to the deployed server's address, e.g. https://api.brewai.app
const BASE_URL = import.meta.env.VITE_API_URL ?? ''

/**
 * One place that talks to the server:
 *  - attaches the signed-in user's token (the server's `protect` middleware needs it),
 *  - sends JSON, or FormData for file uploads,
 *  - turns any failure into an Error with a readable message, so pages can
 *    just display `error` without knowing about HTTP.
 */
async function request(path, { method = 'GET', json, formData } = {}) {
  const headers = {}
  const token = await getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let body
  if (formData) {
    // Do NOT set Content-Type here: the browser must add it itself, because it
    // includes a random "boundary" string that separates the form fields.
    body = formData
  } else if (json !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(json)
  }

  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, { method, headers, body })
  } catch {
    // fetch only rejects when the request never got an answer (server down, offline).
    throw new Error("Can't reach the server. Check your connection and try again.")
  }

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    // Our server always replies { success: false, message } on errors.
    throw new Error(data?.message ?? `Request failed (${response.status})`)
  }
  return data
}

// ---- Dashboard & Community ----

// -> { total, creations }
export const getCreations = () => request('/api/creations')

// -> [image, ...]
export const getCommunityImages = async () => (await request('/api/community')).images

// -> the updated image (new likes + likedByMe)
export const toggleLike = async (imageId) =>
  (await request(`/api/community/${imageId}/like`, { method: 'POST' })).image

// ---- AI tools ----
// Each returns just what its page renders (see the page for the shape).

// -> markdown string
export const generateArticle = async ({ topic, length }) =>
  (await request('/api/ai/write-article', { method: 'POST', json: { topic, length } })).creation.content

// The server stores titles one per line; the page wants an array.
// -> string[]
export const generateTitles = async ({ keyword, category }) => {
  const { creation } = await request('/api/ai/blog-titles', {
    method: 'POST',
    json: { keyword, category },
  })
  return creation.content.split('\n')
}

// -> { imageUrl }
export const generateImage = async ({ prompt, style, isPublic }) => {
  const { creation } = await request('/api/ai/generate-image', {
    method: 'POST',
    json: { prompt, style, isPublic },
  })
  return { imageUrl: creation.imageUrl }
}

// Helper: build the multipart body the server expects (field names must match
// the server's multer config: "image" for images, "resume" for resumes).
const toFormData = (fields) => {
  const formData = new FormData()
  Object.entries(fields).forEach(([name, value]) => formData.append(name, value))
  return formData
}

// -> { imageUrl }
export const removeBackground = async ({ file }) => {
  const { creation } = await request('/api/ai/remove-background', {
    method: 'POST',
    formData: toFormData({ image: file }),
  })
  return { imageUrl: creation.imageUrl }
}

// -> { imageUrl }
export const removeObject = async ({ file, objectName }) => {
  const { creation } = await request('/api/ai/remove-object', {
    method: 'POST',
    // Text fields go before the file, which is how browser forms send them too.
    formData: toFormData({ object: objectName, image: file }),
  })
  return { imageUrl: creation.imageUrl }
}

// -> { score, summary, strengths, improvements }
export const reviewResume = async ({ file }) =>
  (await request('/api/ai/review-resume', {
    method: 'POST',
    formData: toFormData({ resume: file }),
  })).analysis
