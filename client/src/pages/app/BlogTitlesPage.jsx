import { useState } from 'react'
import { Hash, Sparkles } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import ToolLayout, { ToolPanel } from '../../components/tools/ToolLayout'
import ResultArea from '../../components/tools/ResultArea'
import { Button, CopyButton, Field, PillGroup } from '../../components/ui'
import { TITLE_CATEGORIES } from '../../config/toolOptions'
import { useAsyncAction } from '../../hooks/useAsyncAction'
import { generateTitles } from '../../services/api'

export default function BlogTitlesPage() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('General')
  const [keywordError, setKeywordError] = useState('')
  const { run, loading, result, error } = useAsyncAction(generateTitles)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!keyword.trim()) {
      setKeywordError('Please enter a keyword first.')
      return
    }
    setKeywordError('')
    run({ keyword: keyword.trim(), category })
  }

  return (
    <>
      <PageHeader title="Blog Titles" description="Catchy titles for any keyword and category." />
      <ToolLayout>
        <ToolPanel icon={Sparkles} title="AI Title Generator">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Field
              label="Keyword"
              placeholder="e.g. remote work"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              error={keywordError}
            />
            <PillGroup label="Category" options={TITLE_CATEGORIES} value={category} onChange={setCategory} />
            <Button type="submit" icon={Hash} loading={loading} className="w-full">
              Generate Titles
            </Button>
          </form>
        </ToolPanel>

        <ToolPanel icon={Hash} title="Generated Titles">
          <ResultArea
            loading={loading}
            error={error}
            hasResult={Boolean(result)}
            loadingText="Thinking up titles..."
            emptyIcon={Hash}
            emptyTitle="Your titles will appear here"
            emptyDescription="Enter a keyword and click Generate Titles to get started."
          >
            <ul className="divide-y divide-slate-100">
              {result?.map((title) => (
                <li key={title} className="flex items-center justify-between gap-3 py-3">
                  <span className="text-sm font-medium text-slate-800">{title}</span>
                  <CopyButton text={title} />
                </li>
              ))}
            </ul>
          </ResultArea>
        </ToolPanel>
      </ToolLayout>
    </>
  )
}
