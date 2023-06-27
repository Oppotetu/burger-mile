<script lang="ts">
	import BurgerCard from '$lib/components/BurgerCard.svelte'
	import { calculateDistance } from '$lib/CalculateDistance'
	import Geolocation from 'svelte-geolocation'
	import { Paginator, type PopupSettings, ListBox, ListBoxItem } from '@skeletonlabs/skeleton'
	import { quintOut } from 'svelte/easing'
	import { crossfade, fade, fly, scale } from 'svelte/transition'
	import { onDestroy, onMount } from 'svelte'
	import { sortByValue } from '$lib/stores.js'
	// import { sortLocalStore } from '$lib/stores.js'
	import { get } from 'svelte/store'
	import { navigating } from '$app/stores'

	let events: any = []

	export let data

	$: sortByValue

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

	const pageReset = () => {
		paginator.offset = 0
	}

	let paginator = {
		offset: 0,
		limit: 8,
		size: data.restos.length,
		amounts: [4, 8, 10, 15]
	}

	$: paginatedSource = source.slice(
		paginator.offset * paginator.limit, // start
		paginator.offset * paginator.limit + paginator.limit // end
	)

	// function triggerRight(): void {
	// 	const drawerSettings: DrawerSettings = { id: 'right', position: 'right' }
	// 	drawerStore.open(drawerSettings)
	// }

	const scrollToBurgers = (e: any) => {
		return document.querySelector('#last-hr')?.scrollIntoView({
			behavior: 'smooth'
		})
	}

	let popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'combobox',
		placement: 'bottom',
		// Close the popup when the item is clicked
		closeQuery: '.listbox-item'
	}

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '' : style.transform

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t * 0.5}
				`
			}
		}
	})

	onMount(() => {
		document.getElementById('page')?.scrollTo(0, 0)
		// console.log(get(sortLocalStore))
	})

  onDestroy(() => {
    // console.log(get(sortLocalStore))
  })

	// $: if ($navigating?.to?.route.id === '/[resto]') {
	// 	sortLocalStore.set($sortByValue)
	// 	// console.log(get(sortLocalStore))
	// }
</script>

<svelte:head>
	<title>Burgermile home</title>
</svelte:head>

<div class="card variant-glass-secondary z-[888] w-48 py-2 shadow-xl" data-popup="combobox">
	<ListBox rounded="rounded-none">
		<ListBoxItem
			on:click={pageReset}
			on:click={scrollToBurgers}
			bind:group={$sortByValue}
			name="average"
			value="average">Score</ListBoxItem
		>
		<ListBoxItem
			on:click={pageReset}
			on:click={scrollToBurgers}
			bind:group={$sortByValue}
			name="food"
			value="food">Food</ListBoxItem
		>
		<ListBoxItem
			on:click={pageReset}
			on:click={scrollToBurgers}
			bind:group={$sortByValue}
			name="price"
			value="price">Price</ListBoxItem
		>
		<ListBoxItem
			on:click={pageReset}
			on:click={scrollToBurgers}
			bind:group={$sortByValue}
			name="atmosphere"
			value="atmosphere">Atmosphere</ListBoxItem
		>
		<ListBoxItem
			on:click={pageReset}
			on:click={scrollToBurgers}
			bind:group={$sortByValue}
			name="itFactor"
			value="itFactor">It-Factor</ListBoxItem
		>
		<ListBoxItem
			on:click={pageReset}
			on:click={scrollToBurgers}
			bind:group={$sortByValue}
			name="distance"
			value="distance">Proximity</ListBoxItem
		>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>

<Geolocation
	getPosition
	on:position={(e) => {
		events = [...events, e.detail]
		for (let i of data.restos.result) {
			Object.assign(i, {
				distance: calculateDistance(
					i.latLng?.lng,
					events[0].coords.longitude,
					i.latLng?.lat,
					events[0].coords.latitude
				)
			})
		}
		// console.log(e.detail) // GeolocationPosition
	}}
	on:error={(e) => {
		events = [...events, e.detail]
		// console.log(e.detail) // GeolocationError
	}}
/>

<!-- <div class="flex flex-col justify-center text-center">
	<h1 class="p-2 md:p-6">Welcome to Burgermile</h1>
	<h3 class="p-6">Discovering the world one burger at a time</h3> -->

<!-- <div id="last-para" class="position-md lg:position-lg flex h-10 justify-center">
	{#if buttonIsUp}
		<button
			in:receive={{ key: 'button-id', duration: 400 }}
			out:send={{ key: 'button-id', duration: 400 }}
			use:popup={popupCombobox}
			class="btn variant-filled-primary w-48"
		>
			{$sortByValue === 'average'
				? 'Score'
				: $sortByValue === '_id'
				? 'Sort by'
				: $sortByValue.charAt(0).toUpperCase() + $sortByValue.slice(1)}
		</button>
	{/if}
</div> -->

<!-- <hr class="my-6" id="last-hr" />
</div> -->

<hr class="mb-6" />

<div class="md:mx-[20%]">
	<Paginator
		bind:settings={paginator}
		text="text-md"
		buttonClasses="btn-icon variant-filled-primary w-14 text-2xl"
	/>
</div>

<hr class="my-6" id="last-hr" />

{#key paginatedSource}
	<div
		in:fly|local={{ y: -30 }}
		class="breakout flex flex-1 flex-row flex-wrap justify-center gap-8 p-4 lg:gap-12"
	>
		{#each paginatedSource as joint}
			<BurgerCard {joint} />
		{/each}
	</div>
{/key}

<hr class="my-6" />

<div class="md:mx-[15%]">
	<Paginator
		on:page={scrollToBurgers}
		bind:settings={paginator}
		text="text-md"
		buttonClasses="btn-icon variant-filled-primary w-14"
	/>
</div>

<hr class="mt-6" />

<style>
	@media (max-width: 767px) {
		.breakout {
			width: 100vw;
			position: relative;
			left: 50%;
			right: 50%;
			margin-left: -50vw;
			margin-right: -50vw;
		}
	}
</style>
