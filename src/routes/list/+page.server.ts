import { client } from '$lib/config/client.js'
import type { Joint } from '$lib/types'

export async function load({ url }) {
	const page = Number(url.searchParams.get('page')) || 1
	const sortBy = url.searchParams.get('sort') || '_id'
	const orderBy = url.searchParams.get('order') || 'desc'

	async function getProducts(page: number, sortBy: string, orderBy: string) {
		const limit = 8
		const res: Joint[] = await client.fetch(
			`*[_type == "joint" && defined(image.asset._ref)] | order(${sortBy} ${orderBy}) [${
				(page - 1) * limit
			}...${page * limit}] `
		)
		return res
	}

	const getTotal = async () => {
		const total = await client.fetch(`count(*[_type == "joint" && defined(image.asset._ref)])`)
		return { total }
	}

	return {
		restos: getProducts(page, sortBy, orderBy),
		total: getTotal()
	}
}
