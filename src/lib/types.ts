export type Joint = {
	name: string
	slug: {
		current: string
	}
	city: string
	adress: string
	year: number
	food: number
	price: number
	atmosphere: number
	itFactor: number
	average: number
	gourmetOrJoint: string
	review: string
  pros: string[]
  cons: string[]
	latLng: {
		lat: number
		lng: number
	}
	distance: number
	image: {
		asset: {
			_ref: string
		}
	}
	_createdAt: string
	_id: string
	sort: string | undefined
}
