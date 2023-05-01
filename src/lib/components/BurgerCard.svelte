<script lang="ts">
	import { urlFor } from '$lib/config/images'
	import type { Joint } from '$lib/types'
	import iconDistance from '$lib/assets/icon-distance.png'
	import Geolocation from 'svelte-geolocation'

	let coords: any = []

	export let joint: Joint
</script>

<Geolocation getPosition bind:coords />

<a class="card card-hover w-60 overflow-hidden" href={`/${joint.slug.current}`}>
	<header class="card-header p-0">
		<img
			class="h-72 w-full rounded-md bg-black/50"
			src={joint.image && urlFor(joint.image.asset._ref).width(235).height(330).url()}
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
