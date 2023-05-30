<script lang="ts">
	import { page } from '$app/stores'
	import { urlFor } from '$lib/config/images.js'
	import { ProgressBar, popup, type PopupSettings } from '@skeletonlabs/skeleton'
	import { onMount } from 'svelte'
	export let data
	let resto = data.resto.slice()[0]

	// const popupHover: PopupSettings = {
	// 	event: 'hover',
	// 	target: 'popupHover',
	// 	placement: 'top'
	// }

	onMount(() => {
		document.getElementById('page')?.scrollTo(0, 0)
	})
</script>

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

		<div class="card grid grid-cols-1 gap-1 md:mx-[12%] md:!grid-cols-3">
			<div class="p-2 md:p-6">
				<h4 class="w-full pb-2">Pros 👍</h4>
				<span class="chip variant-ghost-success">fresh</span>
				<span class="chip variant-ghost-success">frosh</span>
				<span class="chip variant-ghost-success">frosh</span>
			</div>
			<div class="p-2 md:p-6">
				<h4 class="w-full pb-2">Cons 👎</h4>
				<span class="chip variant-ghost-error">soggy</span>
				<span class="chip variant-ghost-error">overcooked</span>
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
			<li>
				<p>🎲</p>
				<ProgressBar
					label="Score"
					value={resto.average}
					max={6}
					meter="bg-primary-500"
					track="bg-surface-300 dark:bg-surface-500"
				/>
			</li>
		</ul>

		<div class="card p-6 text-center md:col-start-3 md:row-start-4 md:mx-[12%]">
			<p>Reviewed in {resto.year}</p>
			<p>
				Check out {resto.name} in the <a href={`map?setView=${resto.slug.current}`}>map</a>!
			</p>
		</div>
	</div>

	<!-- <p
		class="p-6 text-left md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-5 md:px-[12%] md:pt-2"
	>
		{resto.review}
	</p>

	<div class="md:col-start-3 md:row-start-2 md:-ml-4 md:pr-10">
		<h3>Pros 👍</h3>
		<span class="chip variant-ghost-success">fresh</span>
		<span class="chip variant-ghost-success">frosh</span>
		<h4>Cons 👎</h4>
		<span class="chip variant-ghost-error">soggy</span>
		<span class="chip variant-ghost-error">overcooked</span>
	</div>

	<div class="p-6 md:col-start-3 md:row-start-3 md:-ml-4 md:pr-10">
		<div class="flex place-items-center">
			<p class="mr-2 [&>*]:pointer-events-none">🎲</p>
			<ProgressBar
				label="Score"
				value={resto.average}
				max={6}
				meter="bg-primary-500"
				track="bg-surface-300 dark:bg-surface-500"
			/>
		</div>
		<div class="flex place-items-center">
			<p class="mr-2">🍔</p>
			<ProgressBar
				label="Score"
				value={resto.food}
				max={6}
				meter="bg-secondary-500"
				track="bg-surface-300 dark:bg-surface-500"
			/>
		</div>
		<div class="flex place-items-center">
			<p class="mr-2">💰</p>
			<ProgressBar
				label="Score"
				value={resto.price}
				max={6}
				meter="bg-success-400"
				track="bg-surface-300 dark:bg-surface-500"
			/>
		</div>
		<div class="flex place-items-center">
			<p class="mr-2">🎉</p>
			<ProgressBar
				label="Score"
				value={resto.atmosphere}
				max={6}
				meter="bg-warning-300"
				track="bg-surface-300 dark:bg-surface-500"
			/>
		</div>
		<div class="flex place-items-center">
			<p class="mr-2">😎</p>
			<ProgressBar
				label="Score"
				value={resto.itFactor}
				max={6}
				meter="bg-tertiary-500"
				track="bg-surface-300 dark:bg-surface-500"
			/>
		</div>
	</div>
	<div class="text-center md:col-start-3 md:row-start-4 md:-ml-4 md:pr-10">
		<p>Reviewed in {resto.year}</p>
		<p class="p-2 pb-5">
			Check out {resto.name} in the <a href={`map?setView=${resto.slug.current}`}>map</a>!
		</p>
	</div> -->
</div>

<!-- <div class="text-center md:col-start-3 md:row-start-4 md:-ml-4 md:pr-10">
  <p>{resto.name} is located at {resto.adress}</p>
  <p>Check out {resto.name} in the <a href={`map?setView=${resto.slug.current}`}>map</a>!</p>
</div> -->

<!-- <div class="container mx-auto flex flex-col justify-center text-center md:p-10">
	<h1 class="p-2 md:p-8">{resto.name}</h1>
	<h4>Reviewed in {resto.year}</h4>
	<hr class="py-6 md:py-8" />

	<div class="md:pb-8">
		<p class="pb-10 md:float-left md:w-1/2 md:pb-8 md:pr-12 lg:px-20 lg:pb-12">{resto.review}</p>
		<div class="pb-4 md:float-right md:w-1/2">
			<div class="lg:flex lg:justify-center">
				<img
					class="rounded-md bg-black/50 md:max-w-sm lg:max-w-md"
					src={resto.image && urlFor(resto.image.asset._ref).url()}
					alt={resto.slug.current}
				/>
			</div>
		</div>
		<div class="py-6 md:w-1/2 md:pr-12">
			<p>Food: {resto.food}</p>
			<p>Price: {resto.price}</p>
			<p>Atmosphere: {resto.atmosphere}</p>
			<p>It-Factor: {resto.itFactor}</p>
			<br />
			<p>Total score: {resto.average}</p>
		</div>
	</div>

	<hr class="py-6" />

	<div>
		<p>{resto.name} is located at <br />{resto.adress}</p>
		<br />
		<p>Check out {resto.name} in the <a href={`map?setView=${resto.slug.current}`}>map</a>!</p>
	</div>
</div> -->

<style>
	@media (min-width: 768px) {
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
