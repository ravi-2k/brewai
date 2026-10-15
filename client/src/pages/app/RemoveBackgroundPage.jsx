import { useState } from 'react'
import { Eraser, Image as ImageIcon, Sparkles } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import ToolLayout, { ToolPanel } from '../../components/tools/ToolLayout'
import ResultArea from '../../components/tools/ResultArea'
import ResultImage from '../../components/tools/ResultImage'
import FileUpload from '../../components/tools/FileUpload'
import { Button } from '../../components/ui'
import { useAsyncAction } from '../../hooks/useAsyncAction'
import { removeBackground } from '../../services/api'

export default function RemoveBackgroundPage() {
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const { run, loading, result, error } = useAsyncAction(removeBackground)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!file) {
      setFileError('Please upload an image first.')
      return
    }
    setFileError('')
    run({ file })
  }

  return (
    <>
      <PageHeader title="Remove Background" description="Cut out the background from any image." />
      <ToolLayout>
        <ToolPanel icon={Sparkles} title="Background Removal">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FileUpload
              label="Upload Image"
              accept={['image/*']}
              file={file}
              onChange={setFile}
              error={fileError}
              hint="Supports JPG, PNG and other image formats"
            />
            <Button type="submit" icon={Eraser} loading={loading} className="w-full">
              Remove Background
            </Button>
          </form>
        </ToolPanel>

        <ToolPanel icon={ImageIcon} title="Processed Image">
          <ResultArea
            loading={loading}
            error={error}
            hasResult={Boolean(result)}
            loadingText="Removing the background..."
            emptyIcon={ImageIcon}
            emptyTitle="Your processed image will appear here"
            emptyDescription="Upload an image and click Remove Background to get started."
          >
            <ResultImage src={result?.imageUrl} alt="Image with background removed" transparent />
          </ResultArea>
        </ToolPanel>
      </ToolLayout>
    </>
  )
}
