<script lang="ts">
	import BurgerCard from '../../lib/components/BurgerCard.svelte'
	import { calculateDistance } from '$lib/CalculateDistance'
	import Geolocation from 'svelte-geolocation'
	import { page } from '$app/stores'
	import { onDestroy, onMount } from 'svelte'
	import { browser } from '$app/environment'

	// onMount(() => {
	// 	goto('/?page=1')
	// })

	export let data

	let events: any = []

	let pageSize = 8
	$: totalItems = data.total.total
	$: totalPages = Math.ceil(totalItems / pageSize)
	// $: currentPage = Number($page.url.searchParams.get("page")) || 0
</script>

<Geolocation
	getPosition
	on:position={(e) => {
		events = [...events, e.detail]
		for (let i of data.restos) {
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

<h1 class="text-center pt-4">
	{$page.url.searchParams.has('sort')
		? `Reviews based on ${$page.url.searchParams.get('sort')}`
		: 'All reviews, click the button to sort'}
</h1>
<hr class="mt-6 mb-6" />
<div class="flex place-items-center justify-between md:justify-evenly p-6">
	<div class="dropdown">
		<label tabindex="0" class="btn m-1">Sort By</label>
		<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
			<li>
				<a href="/list?page=1&sort=average">Total Score</a>
			</li>
			<li><a href="/list?page=1&sort=food">Best Food</a></li>
			<li><a href="/list?page=1&sort=price&order=asc">Lowest Price</a></li>
			<li><a href="/list?page=1&sort=atmosphere">Best Atmosphere</a></li>
			<li><a href="/list?page=1&sort=itFactor">Best It-Factor</a></li>
		</ul>
	</div>

	<p class="text-center">Page {$page.url.searchParams.get('page')}</p>

	<div class="btn-group">
		{#each Array(totalPages) as _, idx}
			<button
				class={`btn ${Number($page.url.searchParams.get('page')) === idx + 1 ? 'btn-active' : ''}`}
			>
				<a
					class="inline-block p-3 -m-3 z-40"
					href="/list?page={idx + 1}{$page.url.searchParams.has('sort')
						? `&sort=${$page.url.searchParams.get('sort')}`
						: ''}{$page.url.searchParams.has('order')
						? `&order=${$page.url.searchParams.get('order')}`
						: ''}"
				>
					{idx + 1}
				</a>
			</button>
		{/each}
	</div>
</div>

<hr class="mt-6 mb-6" />
<div class="p-2 justify-center">
	<div class="flex flex-row flex-wrap flex-1 justify-center gap-12 mr-4 ml-4">
		{#each data.restos as joint}
			<!-- <BurgerCard {joint} /> -->
			<p>{joint.name}</p>
		{/each}
	</div>
</div>
<hr class="mt-6 mb-6" />
<div class="btn-group flex justify-center">
	{#each Array(totalPages) as _, idx}
		<button
			class={`btn ${Number($page.url.searchParams.get('page')) === idx + 1 ? 'btn-active' : ''}`}
		>
			<a
				class="inline-block p-3 -m-3 z-40"
				href="/list?page={idx + 1}{$page.url.searchParams.has('sort')
					? `&sort=${$page.url.searchParams.get('sort')}`
					: ''}{$page.url.searchParams.has('order')
					? `&order=${$page.url.searchParams.get('order')}`
					: ''}"
			>
				{idx + 1}
			</a>
		</button>
	{/each}
</div>
