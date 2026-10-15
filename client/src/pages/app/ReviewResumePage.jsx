import { useState } from 'react'
import { FileSearch, FileText, Sparkles } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import ToolLayout, { ToolPanel } from '../../components/tools/ToolLayout'
import ResultArea from '../../components/tools/ResultArea'
import ResumeAnalysis from '../../components/tools/ResumeAnalysis'
import FileUpload from '../../components/tools/FileUpload'
import { Button } from '../../components/ui'
import { useAsyncAction } from '../../hooks/useAsyncAction'
import { reviewResume } from '../../services/api'

export default function ReviewResumePage() {
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const { run, loading, result, error } = useAsyncAction(reviewResume)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!file) {
      setFileError('Please upload your resume first.')
      return
    }
    setFileError('')
    run({ file })
  }

  return (
    <>
      <PageHeader title="Review Resume" description="Get clear, actionable feedback on your resume." />
      <ToolLayout>
        <ToolPanel icon={Sparkles} title="Review Resume">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FileUpload
              label="Upload Resume"
              accept={['application/pdf', 'image/*']}
              file={file}
              onChange={setFile}
              error={fileError}
              hint="Supports PDF, JPG, PNG formats"
            />
            <Button type="submit" icon={FileSearch} loading={loading} className="w-full">
              Review Resume
            </Button>
          </form>
        </ToolPanel>

        <ToolPanel icon={FileText} title="Analysis Result">
          <ResultArea
            loading={loading}
            error={error}
            hasResult={Boolean(result)}
            loadingText="Reading your resume..."
            emptyIcon={FileText}
            emptyTitle="Your analysis will appear here"
            emptyDescription="Upload your resume and click Review Resume to get started."
          >
            <ResumeAnalysis analysis={result} />
          </ResultArea>
        </ToolPanel>
      </ToolLayout>
    </>
  )
}
