import { client } from '$lib/config/client'
import type { Joint } from '$lib/types'

export async function load({ url }) {
	let slug = url.pathname.substring(1)

	const getResto = async (slug: string) => {
		const result: Joint[] = await client.fetch(`*[_type == "joint" && slug.current == ${slug}]`)
		return { result }
	}

	return { resto: getResto(slug) }
}
