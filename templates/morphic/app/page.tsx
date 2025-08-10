import { generateId } from 'ai'

import { getModels } from '@/lib/config/models'

import { Chat } from '@/components/chat'
import { ModelSelectorHandler } from '@/components/model-selector-handler'

interface PageProps {
  searchParams: Promise<{
    model?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const id = generateId()
  const models = await getModels()
  const params = await searchParams

  return (
    <>
      {params.model && (
        <ModelSelectorHandler modelHash={params.model} redirectUrl="/" />
      )}
      <Chat id={id} models={models} hideModelSelector />
    </>
  )
}
