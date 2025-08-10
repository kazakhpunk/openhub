import { redirect } from 'next/navigation'

import { generateId } from 'ai'

import { getModels } from '@/lib/config/models'

import { Chat } from '@/components/chat'
import { ModelSelectorHandler } from '@/components/model-selector-handler'

export const maxDuration = 60

export default async function SearchPage(props: {
  searchParams: Promise<{ q: string; model?: string }>
}) {
  const { q, model } = await props.searchParams
  if (!q) {
    redirect('/')
  }

  const id = generateId()
  const models = await getModels()

  return (
    <>
      {model && (
        <ModelSelectorHandler
          modelHash={model}
          redirectUrl={`/search?q=${encodeURIComponent(q)}`}
        />
      )}
      <Chat id={id} query={q} models={models} hideModelSelector />
    </>
  )
}
