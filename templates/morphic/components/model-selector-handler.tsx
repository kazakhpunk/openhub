'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ModelSelectorHandlerProps {
  modelHash?: string
  redirectUrl?: string
}

export function ModelSelectorHandler({
  modelHash,
  redirectUrl
}: ModelSelectorHandlerProps) {
  const router = useRouter()

  useEffect(() => {
    if (modelHash) {
      fetch('/api/set-model-cookie', {
        method: 'POST',
        body: JSON.stringify({ hash: modelHash }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => {
          if (res.ok && redirectUrl) {
            router.replace(redirectUrl)
          }
        })
        .catch(error => {
          console.error('Error setting model:', error)
        })
    }
  }, [modelHash, redirectUrl, router])

  return null // This component doesn't render anything
}
