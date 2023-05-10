import { writable, type Writable } from 'svelte/store'

export const sortByValue: Writable<string> = writable('_id')

export const reset: Writable<boolean> = writable(false)

export const userGeoStatus: Writable<number[]> = writable([])
