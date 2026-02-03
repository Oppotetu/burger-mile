<script lang="ts">
	import { page } from '$app/stores'
	import { urlFor } from '$lib/config/images.js'
	// import { sortLocalStore } from '$lib/stores.js'
	import { ProgressBar, popup, type PopupSettings } from '@skeletonlabs/skeleton'
	import { onDestroy, onMount } from 'svelte'
	// import { get } from 'svelte/store'
	export let data
	let resto = data.resto.slice()[0]

	// const popupHover: PopupSettings = {
	// 	event: 'hover',
	// 	target: 'popupHover',
	// 	placement: 'top'
	// }

	onMount(() => {
		document.getElementById('page')?.scrollTo(0, 0)
		// console.log(get(sortLocalStore))
	})

	onDestroy(() => {
		// console.log(get(sortLocalStore))
	})
</script>

<svelte:head>
	<title>Review of {resto.name}</title>
</svelte:head>

<!-- <div class="card variant-filled-secondary z-[9999] p-4" data-popup="popupHover">
	<p>content</p>
	<div class="arrow variant-filled-secondary" />
</div> -->

<div class="grid-template mx-auto min-h-screen text-center md:grid md:grid-cols-2">
	<h1 class="mt-4 p-2">{resto.name}</h1>

	<div
		class="my-6 flex place-items-center justify-center md:col-start-2 md:row-start-1 md:m-4 md:my-0 md:h-screen"
	>
		<img
			class="the-image rounded-md bg-black/50 md:w-max"
			src={resto.image && urlFor(resto.image.asset._ref).url()}
			alt={resto.slug.current}
		/>
	</div>

	<div class="flex flex-col justify-center gap-6 md:col-start-1 md:row-start-2">
		<p class="card p-6 text-left md:mx-[12%]">
			{resto.review}
		</p>

		<!-- {#if resto.pros}
			<div class="card grid grid-cols-1 gap-1 md:mx-[12%] md:!grid-cols-3">
				<div class="p-2 md:p-6">
					<h4 class="w-full pb-2">Pros 👍</h4>
					{#each resto.pros as pro}
						<span class="chip variant-ghost-success">{pro}</span>
					{/each}
				</div>
				<div class="p-2 md:p-6">
					<h4 class="w-full pb-2">Cons 👎</h4>
					{#each resto.cons as con}
						<span class="chip variant-ghost-error">{con}</span>
					{/each}
				</div>
				<span class="p-2 md:p-6">
					<h4 class="w-full pb-2">Price 💰</h4>
					{#if resto.price === 1 || resto.price === 2}
						<p>Cheap</p>
					{:else if resto.price === 3 || resto.price === 4}
						<p>Mid-priced</p>
					{:else if resto.price === 5 || resto.price === 6}
						<p>Expensive</p>
					{/if}
				</span>
			</div>
		{/if} -->

		<ul class="card list -space-y-3 md:mx-[12%]">
			<li>
				<p>🍔</p>
				<ProgressBar
					label="Score"
					value={resto.food}
					max={6}
					meter="bg-secondary-500"
					track="bg-surface-300 dark:bg-surface-500"
				/>
			</li>
			<li>
				<p>🎉</p>
				<ProgressBar
					label="Score"
					value={resto.atmosphere}
					max={6}
					meter="bg-warning-300"
					track="bg-surface-300 dark:bg-surface-500"
				/>
			</li>
			<li>
				<p>😎</p>
				<ProgressBar
					label="Score"
					value={resto.itFactor}
					max={6}
					meter="bg-tertiary-500"
					track="bg-surface-300 dark:bg-surface-500"
				/>
			</li>
		</ul>

		<div class="card grid grid-cols-1 gap-1 md:mx-[12%] md:!grid-cols-2">
			<span class="p-2 md:p-6">
				<h4 class="w-full pb-2">Price 💰</h4>
				{#if resto.price === 1 || resto.price === 2}
					<span class="badge variant-ghost-success h-12 w-12">$</span>
				{:else if resto.price === 3 || resto.price === 4}
					<span class="badge variant-ghost-success h-12 w-12">$$</span>
				{:else if resto.price === 5 || resto.price === 6}
					<span class="badge variant-ghost-success h-12 w-12">$$$</span>
				{/if}
			</span>
			<span class="flex flex-col place-items-center p-2 md:p-6">
				<h4 class="w-full pb-2">Score 🎲</h4>
				<span class="badge-icon h-12 w-12 border-2 bg-primary-500 border-surface-900-50-token"
					>{resto.average}</span
				>
			</span>
		</div>

		<div class="card p-6 text-center md:col-start-3 md:row-start-4 md:mx-[12%]">
			<p>Reviewed in {resto.year}</p>
			<p>
				Check out {resto.name} in the <a href={`map?setView=${resto.slug.current}`}>map</a>!
			</p>
		</div>
	</div>
</div>

<style>
	@media (min-width: 768px) {
		.grid-template {
			grid-template-rows: 12rem 1fr;
			/* grid-template-rows: 6.5rem repeat(3, minmax(0, 1fr)); */
		}
	}
	@media (min-width: 1024px) {
		.grid-template {
			grid-template-rows: 8.5rem 1fr;
			/* grid-template-rows: 6.5rem repeat(3, minmax(0, 1fr)); */
		}
	}
	@media (min-width: 1281px) {
		.grid-template {
			grid-template-rows: 6.5rem 1fr;
			/* grid-template-rows: 6.5rem repeat(3, minmax(0, 1fr)); */
		}
	}
	@media (min-width: 768px) {
		.the-image {
			max-height: 95vh;
		}
	}
</style>
