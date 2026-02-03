import { client } from '$lib/config/client'
import type { Joint } from '$lib/types'

export const load = async () => {
	const restos: Joint[] = await client.fetch(`*[_type == "joint"]`)

	return { restos }
}
