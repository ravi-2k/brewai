import { useRef, useState } from 'react'
import { FileText, Info, Upload, X } from 'lucide-react'
import { useObjectUrl } from '../../hooks/useObjectUrl'
import { cn } from '../../utils/cn'

// 'image/*' matches any image; 'application/pdf' must match exactly.
const matchesType = (file, pattern) =>
  pattern.endsWith('/*') ? file.type.startsWith(pattern.slice(0, -1)) : file.type === pattern

/**
 * Click-or-drag file picker with preview. Controlled: parent owns `file`.
 *   <FileUpload label="Upload Image" accept={['image/*']} file={file} onChange={setFile} hint="..." />
 */
export default function FileUpload({ label, accept, file, onChange, hint, error }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [typeError, setTypeError] = useState('')
  const previewUrl = useObjectUrl(file?.type.startsWith('image/') ? file : null)

  const selectFile = (selected) => {
    if (!selected) return
    if (!accept.some((pattern) => matchesType(selected, pattern))) {
      setTypeError('That file type is not supported.')
      return
    }
    setTypeError('')
    onChange(selected)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    selectFile(event.dataTransfer.files[0])
  }

  const message = typeError || error

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>

      {/* Hidden native input; our styled box below triggers it. */}
      <input
        ref={inputRef}
        type="file"
        accept={accept.join(',')}
        className="hidden"
        onChange={(event) => {
          selectFile(event.target.files[0])
          event.target.value = '' // allow picking the same file again later
        }}
      />

      {file ? (
        <div className="flex items-center gap-4 rounded-xl p-3 ring-1 ring-inset ring-slate-200">
          {previewUrl ? (
            <img src={previewUrl} alt="Selected upload preview" className="size-16 rounded-lg object-cover" />
          ) : (
            <span className="flex size-16 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
              <FileText className="size-7" />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{file.name}</p>
            <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove file"
            className="cursor-pointer rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="size-5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors',
            dragging ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50',
          )}
        >
          <Upload className="size-6 text-slate-400" />
          <span className="text-sm text-slate-600">
            <span className="font-medium text-brand-600">Click to upload</span> or drag and drop
          </span>
        </button>
      )}

      {message ? (
        <p role="alert" className="mt-2 text-xs text-red-600">{message}</p>
      ) : (
        hint && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-700">
            <Info className="size-3.5 shrink-0" />
            {hint}
          </p>
        )
      )}
    </div>
  )
}
