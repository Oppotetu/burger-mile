import { createClient } from '@sanity/client'

export const client = createClient({
	projectId: 'evdgq9za',
	dataset: 'production',
	apiVersion: '2023-03-24',
	useCdn: false
})
