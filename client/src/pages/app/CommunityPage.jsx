import { useState } from 'react'
import { Loader2, Users } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import CommunityCard, { LikeButton } from '../../components/community/CommunityCard'
import { EmptyState, Modal } from '../../components/ui'
import { useApiData } from '../../hooks/useApiData'
import { getCommunityImages, toggleLike } from '../../services/api'

// Replace one image inside the list with a new version.
const replaceImage = (images, updated) =>
  images.map((image) => (image.id === updated.id ? updated : image))

export default function CommunityPage() {
  const { data: images, setData: setImages, loading, error } = useApiData(getCommunityImages)
  const [selectedId, setSelectedId] = useState(null)
  const [likeError, setLikeError] = useState('')

  // Store only the id of the open image and look it up each render. That way the
  // modal always shows the latest like count, even after clicking the heart inside it.
  const selected = images?.find((image) => image.id === selectedId)

  // "Optimistic update": flip the heart immediately so the UI feels instant, then
  // let the server confirm. If the request fails, put the old version back.
  const handleToggleLike = async (id) => {
    const original = images.find((image) => image.id === id)
    setLikeError('')

    setImages((current) =>
      replaceImage(current, {
        ...original,
        likedByMe: !original.likedByMe,
        likes: original.likes + (original.likedByMe ? -1 : 1),
      }),
    )

    try {
      const confirmed = await toggleLike(id)
      setImages((current) => replaceImage(current, confirmed)) // the server's numbers win
    } catch (err) {
      setImages((current) => replaceImage(current, original)) // roll back
      setLikeError(err.message)
    }
  }

  return (
    <>
      <PageHeader title="Community" description="Images shared publicly by the BrewAI community." />

      {loading && (
        <div className="flex justify-center py-16" role="status" aria-label="Loading images">
          <Loader2 className="size-8 animate-spin text-brand-600" />
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      {likeError && (
        <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {likeError}
        </p>
      )}

      {images &&
        (images.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No public images yet"
            description="Generate an image with 'Make the image public' turned on to be the first."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <CommunityCard
                key={image.id}
                image={image}
                onOpen={() => setSelectedId(image.id)}
                onToggleLike={() => handleToggleLike(image.id)}
              />
            ))}
          </div>
        ))}

      <Modal open={Boolean(selected)} onClose={() => setSelectedId(null)} title="Image preview">
        {selected && (
          <div>
            <img src={selected.imageUrl} alt={selected.prompt} className="max-h-[70vh] w-full rounded-xl object-contain" />
            <div className="flex items-start justify-between gap-4 p-4">
              <div>
                <p className="text-slate-700">{selected.prompt}</p>
                <p className="mt-1 text-xs text-slate-400">by {selected.authorName}</p>
              </div>
              <LikeButton
                liked={selected.likedByMe}
                count={selected.likes}
                onClick={() => handleToggleLike(selected.id)}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
