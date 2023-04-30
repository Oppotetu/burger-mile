<script lang="ts">
	import BurgerCard from '$lib/components/BurgerCard.svelte'
	import { calculateDistance } from '$lib/CalculateDistance'
	import Geolocation from 'svelte-geolocation'
	import { Paginator, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
	import { sortByValue, reset, userGeoStatus } from '../stores.js'
	import { goto } from '$app/navigation'
	import StickyButton from '$lib/components/StickyButton.svelte'

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

	function scrollIntoView({ target }) {
		const el = document.querySelector(target.getAttribute('href'))
		if (!el) return
		el.scrollIntoView({
			behavior: 'smooth'
		})
	}
</script>

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

<div class="container md:p-10 mx-auto flex flex-col text-center justify-center">
	<h1 class="p-2 md:p-8">Welcome to Burgermile</h1>
	<h4>Burger reviews and catering since 2020</h4>
	<hr class="py-6 md:py-8" />
	<a href="#sticky-button" on:click|preventDefault={scrollIntoView}>smooth</a>
	<div class="space-y-5">
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
		<!-- <button type="button" class="btn btn-xl variant-filled-primary" on:click={triggerRight}
			>Sort by</button
		> -->
		<!-- <button
			type="button"
			class="btn btn-xl variant-filled-primary sticky-test"
			on:click={triggerRight}>Sort by</button
		> -->

		<StickyButton {triggerRight} />
	</div>

	<hr class="my-6" />

	<Paginator
		bind:settings={paginator}
		text="text-md"
		buttonClasses="btn-icon variant-filled-primary w-14 text-2xl"
	/>

	<hr class="my-6" />
</div>

<!-- <div class="fixed right-2 md:right-16 md:top-40">
	<button type="button" class="btn btn-xl variant-glass-tertiary" on:click={triggerRight}
		>Sort by</button
	>
</div> -->

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

<style>
	.sticky-test {
		tab-size: 4;
		user-select: none;
		border: 0 solid #e5e7eb;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 50%;
		z-index: 40;
		margin-left: -5rem;
		display: flex;
		height: 2.25rem;
		width: 10rem;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border-width: 1px;
		font-size: 0.875rem;
		line-height: 1.25rem;

		backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
			var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate)
			var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
			var(--tw-backdrop-sepia);
		--tw-backdrop-blur: blur(8px);
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 0.5s;
		--tw-border-opacity: 1;
		border-color: rgb(31 41 55 / var(--tw-border-opacity));
		background-color: rgb(0 0 0 / var(--tw-bg-opacity));
		--tw-bg-opacity: 0.5;
		--tw-text-opacity: 1;
		color: rgb(212 212 216 / var(--tw-text-opacity));
	}
</style>
