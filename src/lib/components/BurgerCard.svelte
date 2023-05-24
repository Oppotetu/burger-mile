<script lang="ts">
	import { urlFor } from '$lib/config/images'
	import type { Joint } from '$lib/types'
	import iconDistance from '$lib/assets/icon-distance.png'
	import Geolocation from 'svelte-geolocation'
	import { onMount } from 'svelte'
	import { windowSizeStore } from 'svelte-legos'

	const size = windowSizeStore()

	let coords: any = []

	export let joint: Joint

	var x: any

	onMount(() => {
		// function checkWidth() {
		//   if (window.matchMedia('(max-width: 768px)').matches) {
		//     return urlFor(joint.image.asset._ref).width(320).height(240).url()
		//   } else {
		//     return urlFor(joint.image.asset._ref).width(240).height(288).url()
		//   }
		// }
	})
</script>

<Geolocation getPosition bind:coords />

<!-- src={joint.image && urlFor(joint.image.asset._ref).width(235).height(330).url()} -->
<!-- <button class="btn" on:click={matchesMedia(x)}>heu</button> -->

<!-- {window.matchMedia('(max-width: 768px)').matches
				? urlFor(joint.image.asset._ref).width(320).height(240).url()
				: urlFor(joint.image.asset._ref).width(240).height(288).url()} -->

<a class="card card-hover w-80 overflow-hidden md:w-60" href={`/${joint.slug.current}`}>
	<header class="card-header p-0">
		<img
			class="h-60 w-full rounded-md bg-black/50 md:h-72"
			src={$size.width <= 768
				? urlFor(joint.image.asset._ref).width(320).height(240).url()
				: urlFor(joint.image.asset._ref).width(240).height(288).url()}
			alt={joint.slug.current}
		/>
	</header>
	<section class="space-y-2 p-2 dark:bg-surface-800">
		<h3 class="card-title">
			{joint.name}
		</h3>
		<p>
			🎲 Score: {joint.average}
		</p>
		<p>
			Food:
			{#each { length: joint.food } as _}
				<span>🍔</span>
			{/each}
		</p>
		<p>
			Price:
			{#each { length: joint.price } as _}
				<span>💰</span>
			{/each}
		</p>
		<p>
			Atmosphere:
			{#each { length: joint.atmosphere } as _}
				<span>🎉</span>
			{/each}
		</p>
		<p>
			It-factor:
			{#each { length: joint.itFactor } as _}
				<span>😎</span>
			{/each}
		</p>
		<div class=" flex flex-row items-center justify-center">
			<img src={iconDistance} alt="icon-distance" class="w-5 pt-1" />
			<p>{joint.distance} km</p>
		</div>
	</section>
</a>
<!-- {#each { length: 6 - joint.food } as _}
<span><img src={grayBurger} alt="grayburger" /></span>
{/each} -->
