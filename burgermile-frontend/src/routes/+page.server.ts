import { page } from '$app/stores'
import { client } from '$lib/config/client.js'
import type { Joint } from '$lib/types'

export async function load({ url }) {
	// const page = Number(url.searchParams.get('page')) || 1
	// const sortBy = url.searchParams.get('sort') || '_id'
	// const orderBy = url.searchParams.get('order') || 'desc'

	let lastItem: string | number = ''
	let lastId: string | null = ''

	const getTotal = async () => {
		const total = await client.fetch(`count(*[_type == "joint" && defined(image.asset._ref)])`)
		return { total }
	}

	async function fetchNextPage() {
		const result: Joint[] = await client.fetch(`*[_type == "joint" && defined(image.asset._ref)]`)
		// const result = await client.fetch(
		// 	`*[_type == "article" && (
		//     ${sortByValue} > $lastItem
		//     || (${sortByValue} == $lastItem && _id > $lastId)
		//   )] | order(${sortByValue}) [0...3] {
		//     _id, title, body, ${sortByValue}
		//   }`
		// )

		// if (result.length > 0) {
		// 	lastItem = result[result.length - 1].sortByValue
		// 	lastId = result[result.length - 1]._id
		// } else {
		// 	lastId = null // Reached the end
		// }
		return { result: result, length: result.length }
	}

	return { restos: fetchNextPage() }
}
// export async function load({ url }) {
// const page = Number(url.searchParams.get('page')) || 1
// const sortBy = url.searchParams.get('sort') || '_id'
// const orderBy = url.searchParams.get('order') || 'desc'

// async function getProducts(page: number, sortBy: string, orderBy: string) {
// 	const limit = 8
// 	const res: Joint[] = await client.fetch(
// 		`*[_type == "joint" && defined(image.asset._ref)] | order(${sortBy} ${orderBy}) [${
// 			(page - 1) * limit
// 		}...${page * limit}] `
// 	)
// 	return res
// }

// 	const getTotal = async () => {
// 		const total = await client.fetch(`count(*[_type == "joint" && defined(image.asset._ref)])`)
// 		return { total }
// 	}

// 	return {
// 		restos: getProducts(page, sortBy, orderBy),
// 		total: getTotal()
// 	}
// }
