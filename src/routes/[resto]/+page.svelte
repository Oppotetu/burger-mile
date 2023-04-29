<script lang="ts">
	import { page } from '$app/stores'
	import { urlFor } from '$lib/config/images.js'
	export let data
	let resto = data.resto.slice()[0]
</script>

<div class="container p-2 md:p-10 mx-auto flex flex-col text-center justify-center">
	<h1 class="p-2 md:p-8">{resto.name}</h1>
	<p>Reviewed in {resto.year}</p>
	<hr class="py-6" />

	<div class="md:pb-12">
		<p class="md:float-left md:w-1/2 md:p-5 pb-12">{resto.review}</p>
		<div class="md:float-right md:w-1/2 md:p-5 pb-4">
			<img
				class="rounded-md md:max-w-sm bg-black/50"
				src={resto.image && urlFor(resto.image.asset._ref).url()}
				alt={resto.slug.current}
			/>
		</div>
		<div class="md:w-1/2 py-6">
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
		<p>{resto.name} is located at <br />{resto.adress}, <br />{resto.city}</p>
		<p>Find {resto.name} in the <a href="map">map</a>!</p>
	</div>
</div>
