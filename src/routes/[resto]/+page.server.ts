import { client } from '$lib/config/client'
import type { Joint } from '$lib/types'

export async function load({ params }) {
	let slug: string = params.resto
	const getResto = async () => {
		const result: Joint[] = await client.fetch(`*[slug.current == $slug]`, { slug })

		return result
	}

	return { resto: getResto() }
}
