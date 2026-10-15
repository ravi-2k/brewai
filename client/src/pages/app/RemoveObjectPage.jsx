import { useState } from 'react'
import { Image as ImageIcon, Scissors, Sparkles } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import ToolLayout, { ToolPanel } from '../../components/tools/ToolLayout'
import ResultArea from '../../components/tools/ResultArea'
import ResultImage from '../../components/tools/ResultImage'
import FileUpload from '../../components/tools/FileUpload'
import { Button, Field } from '../../components/ui'
import { useAsyncAction } from '../../hooks/useAsyncAction'
import { removeObject } from '../../services/api'

export default function RemoveObjectPage() {
  const [file, setFile] = useState(null)
  const [objectName, setObjectName] = useState('')
  const [errors, setErrors] = useState({})
  const { run, loading, result, error } = useAsyncAction(removeObject)

  const handleSubmit = (event) => {
    event.preventDefault()
    // Collect every problem at once so the user can fix them in one go.
    const nextErrors = {}
    if (!file) nextErrors.file = 'Please upload an image first.'
    if (!objectName.trim()) nextErrors.objectName = 'Please describe the object to remove.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    run({ file, objectName: objectName.trim() })
  }

  return (
    <>
      <PageHeader title="Remove Object" description="Erase unwanted objects from your photos." />
      <ToolLayout>
        <ToolPanel icon={Sparkles} title="Object Removal">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FileUpload
              label="Upload Image"
              accept={['image/*']}
              file={file}
              onChange={setFile}
              error={errors.file}
              hint="Supports JPG, PNG and other image formats"
            />
            <Field
              label="Describe object to remove"
              placeholder="e.g. the person in the red shirt"
              value={objectName}
              onChange={(event) => setObjectName(event.target.value)}
              hint="Be specific about the object you want to remove"
              error={errors.objectName}
            />
            <Button type="submit" icon={Scissors} loading={loading} className="w-full">
              Process Image
            </Button>
          </form>
        </ToolPanel>

        <ToolPanel icon={ImageIcon} title="Processed Image">
          <ResultArea
            loading={loading}
            error={error}
            hasResult={Boolean(result)}
            loadingText="Removing the object..."
            emptyIcon={ImageIcon}
            emptyTitle="Your processed image will appear here"
            emptyDescription="Upload an image, describe the object, and click Process Image."
          >
            <ResultImage src={result?.imageUrl} alt="Image with object removed" />
          </ResultArea>
        </ToolPanel>
      </ToolLayout>
    </>
  )
}
