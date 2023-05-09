<script lang="ts">
	import BurgerCard from '$lib/components/BurgerCard.svelte'
	import { calculateDistance } from '$lib/CalculateDistance'
	import Geolocation from 'svelte-geolocation'
	import {
		Paginator,
		type DrawerSettings,
		type PopupSettings,
		ListBox,
		ListBoxItem,
		popup,
		AppShell
	} from '@skeletonlabs/skeleton'
	import StickyButton from '$lib/components/StickyButton.svelte'
	import { quintOut } from 'svelte/easing'
	import { crossfade, fade, fly, scale } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import fjell1 from '$lib/assets/images/fjell1.jpg'
	import fjell2 from '$lib/assets/images/fjell2.jpg'

	let events: any = []

	export let data

	let sortByValue: string = '_id'

	$: source = data.restos.result.slice()

	$: {
		if (sortByValue === 'average') {
			source = source.sort((a, b) => b.average - a.average)
		} else if (sortByValue === 'food') {
			source = source.sort((a, b) => b.food - a.food)
		} else if (sortByValue === 'price') {
			source = source.sort((a, b) => a.price - b.price)
		} else if (sortByValue === 'atmosphere') {
			source = source.sort((a, b) => b.atmosphere - a.atmosphere)
		} else if (sortByValue === 'itFactor') {
			source = source.sort((a, b) => b.itFactor - a.itFactor)
		} else if (sortByValue === 'distance') {
			source = source.sort((a, b) => a.distance - b.distance)
		}
	}

	const pageReset = () => {
		paginator.offset = 0
	}

	// $: {
	// 	if ($reset === true) {
	// 		paginator.offset = 0
	// 		$reset = false
	// 	}
	// }

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

	// function triggerRight(): void {
	// 	const drawerSettings: DrawerSettings = { id: 'right', position: 'right' }
	// 	drawerStore.open(drawerSettings)
	// }

	function scrollIntoView(e: any) {
		const el = document.querySelector(e.target.getAttribute('href'))
		if (!el) return
		el.scrollIntoView({
			behavior: 'smooth'
		})
	}

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

	let usePopup: any
	// export let sortByValue: string

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

	let buttonIsUp = true
	let upperPara: Element | null

	function handleClick() {
		if (buttonIsUp) {
			buttonIsUp = false
		} else {
			buttonIsUp = true
		}
		console.log(buttonIsUp)
	}
	onMount(() => {
    document.getElementById('page')?.scrollTo(0, 0)

		upperPara = document.getElementById('last-para')

		function isElementInViewport(el: Element) {
			const rect = el.getBoundingClientRect()
			return (
				rect.top >= 30 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
			)
		}

		const callbackFunction = async () => {
			if (upperPara) {
				if (!isElementInViewport(upperPara) && buttonIsUp === true) {
					buttonIsUp = false
				}
				if (isElementInViewport(upperPara) && buttonIsUp === false) {
					buttonIsUp = true
				}
			}
		}
		// callbackFunction()

		document.getElementById('page')?.addEventListener('scroll', function () {
			callbackFunction()
		})
	})
</script>

<div class="card variant-glass-secondary z-[888] w-48 py-2 shadow-xl" data-popup="combobox">
	<ListBox rounded="rounded-none">
		<ListBoxItem
			on:click={pageReset}
			on:click={scrollToBurgers}
			bind:group={sortByValue}
			name="medium"
			value="average">Score</ListBoxItem
		>
		<ListBoxItem
			on:click={pageReset}
			on:click={scrollToBurgers}
			bind:group={sortByValue}
			name="medium"
			value="food">Food</ListBoxItem
		>
		<ListBoxItem
			on:click={pageReset}
			on:click={scrollToBurgers}
			bind:group={sortByValue}
			name="medium"
			value="price">Price</ListBoxItem
		>
		<ListBoxItem
			on:click={pageReset}
			on:click={scrollToBurgers}
			bind:group={sortByValue}
			name="medium"
			value="atmosphere">Atmosphere</ListBoxItem
		>
		<ListBoxItem
			on:click={pageReset}
			on:click={scrollToBurgers}
			bind:group={sortByValue}
			name="medium"
			value="itFactor">It-Factor</ListBoxItem
		>
		<ListBoxItem
			on:click={pageReset}
			on:click={scrollToBurgers}
			bind:group={sortByValue}
			name="medium"
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
					i.latLng.lng,
					events[0].coords.longitude,
					i.latLng.lat,
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

{#if buttonIsUp === false}
	<button
		in:receive={{ key: 'button-id', duration: 400 }}
		out:send={{ key: 'button-id', duration: 400 }}
		use:popup={popupCombobox}
		class="btn btn-icon variant-filled-primary fixed right-4 top-[30%] z-[777] w-24"
	>
		{sortByValue === 'average'
			? 'Score'
			: sortByValue === '_id'
			? 'Sort by'
			: sortByValue.charAt(0).toUpperCase() + sortByValue.slice(1)}
	</button>
{/if}

<div class="flex flex-col justify-center text-center">
	<h1 class="p-2 md:p-6">Welcome to Burgermile</h1>
	<h3 class="p-6">Discovering the world one burger at a time</h3>
	<div id="last-para" class="h-12">
		{#if buttonIsUp}
			<button
				in:receive={{ key: 'button-id', duration: 400 }}
				out:send={{ key: 'button-id', duration: 400 }}
				use:popup={popupCombobox}
				class="btn variant-filled-primary w-48"
			>
				{sortByValue === 'average'
					? 'Score'
					: sortByValue === '_id'
					? 'Sort by'
					: sortByValue.charAt(0).toUpperCase() + sortByValue.slice(1)}
			</button>
		{/if}
	</div>

	<hr class="my-6" id="last-hr" />

	<Paginator
		on:page={scrollToBurgers}
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
{#key paginatedSource}
	<div
		in:fly={{ y: -30 }}
		class="breakout mx-0 flex flex-1 flex-row flex-wrap justify-center gap-12 p-4"
	>
		{#each paginatedSource as joint}
			<BurgerCard {joint} />
		{/each}
	</div>
{/key}
<div class="container mx-auto p-10">
	<hr class="my-6" />

	<Paginator
		on:page={scrollToBurgers}
		bind:settings={paginator}
		text="text-md"
		buttonClasses="btn-icon variant-filled-primary w-14"
	/>

	<hr class="my-6" />
</div>

<style>
	.styled-img {
		background-color: lightseagreen;
		background-image: url(/src/lib/assets/images/fjell2.jpg);
		background-repeat: no-repeat;
		background-size: cover;
	}

	.breakout {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
	}
</style>
