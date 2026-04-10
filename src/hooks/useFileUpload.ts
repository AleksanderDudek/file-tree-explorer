import type { ChangeEvent } from 'react'
import { readFileAsText } from '../pages/Home/Home.service'

interface UseFileUploadOptions {
  onSuccess: (text: string) => void
  onError: (message: string) => void
}

export function useFileUpload({ onSuccess, onError }: UseFileUploadOptions) {
  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    try {
      const text = await readFileAsText(file)
      onSuccess(text)
    } catch {
      onError('fileRead')
    }
  }

  return handleFileChange
}
