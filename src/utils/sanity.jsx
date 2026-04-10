import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'zgcepzen',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01'
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)  // ← was missing this