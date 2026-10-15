import { useState } from 'react'
import { FileText, PenLine, Sparkles } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import ToolLayout, { ToolPanel } from '../../components/tools/ToolLayout'
import ResultArea from '../../components/tools/ResultArea'
import ArticleView from '../../components/tools/ArticleView'
import { Button, Field, PillGroup } from '../../components/ui'
import { ARTICLE_LENGTHS } from '../../config/toolOptions'
import { useAsyncAction } from '../../hooks/useAsyncAction'
import { generateArticle } from '../../services/api'

export default function WriteArticlePage() {
  const [topic, setTopic] = useState('')
  const [length, setLength] = useState('medium')
  const [topicError, setTopicError] = useState('')
  const { run, loading, result, error } = useAsyncAction(generateArticle)

  const handleSubmit = (event) => {
    event.preventDefault() // stop the browser's full-page form submit
    if (!topic.trim()) {
      setTopicError('Please enter a topic first.')
      return
    }
    setTopicError('')
    run({ topic: topic.trim(), length })
  }

  return (
    <>
      <PageHeader title="Write Article" description="Turn any topic into a complete article." />
      <ToolLayout>
        <ToolPanel icon={Sparkles} title="Article Configuration">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Field
              label="Article topic"
              placeholder="The future of artificial intelligence is..."
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              error={topicError}
            />
            <PillGroup label="Article length" options={ARTICLE_LENGTHS} value={length} onChange={setLength} />
            <Button type="submit" icon={PenLine} loading={loading} className="w-full">
              Create Article
            </Button>
          </form>
        </ToolPanel>

        <ToolPanel icon={FileText} title="Generated Article">
          <ResultArea
            loading={loading}
            error={error}
            hasResult={Boolean(result)}
            loadingText="Writing your article..."
            emptyIcon={FileText}
            emptyTitle="Your article will appear here"
            emptyDescription="Enter a topic and click Create Article to get started."
          >
            <ArticleView text={result} />
          </ResultArea>
        </ToolPanel>
      </ToolLayout>
    </>
  )
}
