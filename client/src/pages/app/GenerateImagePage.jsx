import { useState } from 'react'
import { ImagePlus, Sparkles } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import ToolLayout, { ToolPanel } from '../../components/tools/ToolLayout'
import ResultArea from '../../components/tools/ResultArea'
import ResultImage from '../../components/tools/ResultImage'
import { Button, Field, PillGroup, Toggle } from '../../components/ui'
import { IMAGE_STYLES } from '../../config/toolOptions'
import { useAsyncAction } from '../../hooks/useAsyncAction'
import { generateImage } from '../../services/api'

export default function GenerateImagePage() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('Realistic')
  const [isPublic, setIsPublic] = useState(false)
  const [promptError, setPromptError] = useState('')
  const { run, loading, result, error } = useAsyncAction(generateImage)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!prompt.trim()) {
      setPromptError('Please describe the image first.')
      return
    }
    setPromptError('')
    run({ prompt: prompt.trim(), style, isPublic })
  }

  return (
    <>
      <PageHeader title="Generate Image" description="Describe it, pick a style, and watch it appear." />
      <ToolLayout>
        <ToolPanel icon={Sparkles} title="AI Image Generator">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Field
              multiline
              label="Describe your image"
              placeholder="A cozy cabin in a snowy forest at dusk..."
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              error={promptError}
            />
            <PillGroup label="Style" options={IMAGE_STYLES} value={style} onChange={setStyle} />
            <Toggle label="Make the image public" checked={isPublic} onChange={setIsPublic} />
            <Button type="submit" icon={ImagePlus} loading={loading} className="w-full">
              Generate Image
            </Button>
          </form>
        </ToolPanel>

        <ToolPanel icon={ImagePlus} title="Generated Image">
          <ResultArea
            loading={loading}
            error={error}
            hasResult={Boolean(result)}
            loadingText="Painting your image..."
            emptyIcon={ImagePlus}
            emptyTitle="Your image will appear here"
            emptyDescription="Describe an image and click Generate Image to get started."
          >
            <ResultImage src={result?.imageUrl} alt={prompt} />
          </ResultArea>
        </ToolPanel>
      </ToolLayout>
    </>
  )
}
