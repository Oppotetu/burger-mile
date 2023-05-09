<script lang="ts">
	import { page } from '$app/stores'
	import { urlFor } from '$lib/config/images.js'
	import { onMount } from 'svelte'
	export let data
	let resto = data.resto.slice()[0]

	onMount(() => {
		document.getElementById('page')?.scrollTo(0, 0)
	})
</script>

<div class="container mx-auto flex flex-col justify-center text-center md:p-10">
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
</div>
