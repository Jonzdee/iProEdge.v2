import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/schema' // <-- import the named export!

export default defineConfig({
  name: 'default',
  title: 'iproDatabase',

  projectId: 'zgcepzen',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes, // <-- use the array directly
  },
})