<script lang="ts">
	import BurgerCard from '$lib/components/BurgerCard.svelte'
	import { calculateDistance } from '$lib/CalculateDistance'
	import Geolocation from 'svelte-geolocation'
	import { Paginator, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
	import { sortByValue, reset } from '../stores.js'
	import { goto } from '$app/navigation'

	let events: any = []

	export let data

	$: source = data.restos.result.slice()

	$: {
		if ($sortByValue === 'average') {
			source = source.sort((a, b) => b.average - a.average)
		} else if ($sortByValue === 'food') {
			source = source.sort((a, b) => b.food - a.food)
		} else if ($sortByValue === 'price') {
			source = source.sort((a, b) => a.price - b.price)
		} else if ($sortByValue === 'atmosphere') {
			source = source.sort((a, b) => b.atmosphere - a.atmosphere)
		} else if ($sortByValue === 'itFactor') {
			source = source.sort((a, b) => b.itFactor - a.itFactor)
		} else if ($sortByValue === 'distance') {
			source = source.sort((a, b) => a.distance - b.distance)
		}
	}

	$: {
		if ($reset === true) {
			paginator.offset = 0
			$reset = false
		}
	}

	let paginator = {
		offset: 0,
		limit: 6,
		size: data.restos.length,
		amounts: [3, 6, 10, 15]
	}

	$: paginatedSource = source.slice(
		paginator.offset * paginator.limit, // start
		paginator.offset * paginator.limit + paginator.limit // end
	)

	function triggerRight(): void {
		const drawerSettings: DrawerSettings = { id: 'right', position: 'right' }
		drawerStore.open(drawerSettings)
	}

	const mapLink = (): void => {
		goto('map')
	}
</script>

<div class="container p-10 mx-auto flex justify-center items-center">
	<div class="space-y-5 text-center">
		<h1>Welcome to Burgermile</h1>
		<h3>The place for burger reviews and catering</h3>
		<br />
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<br />

		<p>
			Check out the <a href="https://www.instagram.com/burgermile/">Instagram account</a> that started
			it all
		</p>
		<p>We now offer <a href="catering">catering</a> for events!</p>
		<p>Looking for burger close by? Try sorting by "Proximity"</p>
		<!-- <p>
			{$sortByValue === '_id'
				? `Looking for a burger close by? Check out the ${mapLink}, or sort by "Proximity"`
				: `Sorting by ${$sortByValue}`}
		</p> -->

		<button type="button" class="btn btn-xl variant-glass-primary" on:click={triggerRight}
			>Sort by</button
		>

		<hr class="my-6" />

		<Paginator
			bind:settings={paginator}
			text="text-md"
			buttonClasses="btn-icon variant-filled-primary w-14 text-2xl"
		/>

		<hr class="my-6" />
	</div>
</div>

<!-- <div class="fixed right-2 md:right-16 md:top-40">
	<button type="button" class="btn btn-xl variant-glass-tertiary" on:click={triggerRight}
		>Sort by</button
	>
</div> -->

<Geolocation
	getPosition
	on:position={(e) => {
		events = [...events, e.detail]
		for (let i of data.restos.result) {
			Object.assign(i, {
				distance: calculateDistance(
					i.latLng.lng,
					events[0].coords.longitude,
					i.latLng.lat,
					events[0].coords.latitude
				)
			})
		}
		console.log(e.detail) // GeolocationPosition
	}}
	on:error={(e) => {
		events = [...events, e.detail]
		console.log(e.detail) // GeolocationError
	}}
/>

<div class="!container p-4 mx-0 flex flex-row flex-wrap flex-1 justify-center gap-12">
	{#each paginatedSource as joint}
		<BurgerCard {joint} />
	{/each}
</div>

<div class="container p-10 mx-auto">
	<hr class="my-6" />

	<Paginator
		bind:settings={paginator}
		text="text-md"
		buttonClasses="btn-icon variant-filled-primary w-14"
	/>

	<hr class="my-6" />
</div>
