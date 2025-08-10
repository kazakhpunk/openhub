'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getModels } from '@/lib/config/models'
import { findModelByHash } from '@/lib/utils/model-hash'

export async function setModelFromHash(formData: FormData) {
  const hash = formData.get('hash') as string
  const redirectUrl = formData.get('redirectUrl') as string

  const models = await getModels()
  const selectedModel = findModelByHash(hash, models)

  if (selectedModel && selectedModel.enabled) {
    cookies().set('selectedModel', JSON.stringify(selectedModel), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
  }

  // Redirect to remove the model param from URL
  if (redirectUrl) {
    redirect(redirectUrl)
  }
}
