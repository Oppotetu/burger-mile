<script lang="ts">
	import { urlFor } from '$lib/config/images'
	import type { Joint } from '$lib/types'
	import Geolocation from 'svelte-geolocation'
	import { windowSizeStore } from 'svelte-legos'
	import { ProgressBar, type PopupSettings, popup } from '@skeletonlabs/skeleton'

	const size = windowSizeStore()

	let coords: any = []

	export let joint: Joint

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	}
</script>

<Geolocation getPosition bind:coords />

<div class="card variant-filled-secondary z-[9999] p-4" data-popup="popupHover">
	<p>Hover Content</p>
	<div class="arrow variant-filled-secondary" />
</div>

<a class="card card-hover w-80 overflow-hidden md:w-60" href={`/${joint.slug.current}`}>
	<header class="card-header p-0">
		<img
			class="h-56 w-full rounded-md bg-black/50 md:h-64"
			src={$size.width <= 768
				? urlFor(joint.image.asset._ref).width(320).height(224).url()
				: urlFor(joint.image.asset._ref).width(240).height(256).url()}
			alt={joint.slug.current}
		/>
	</header>
	<section class="space-y-1 p-2 dark:bg-surface-800">
		<h3 class="text-center">
			{joint.name}
		</h3>
		<div class="flex place-items-center [&>*]:pointer-events-none">
			<p class="pr-2" use:popup={popupHover}>🎲</p>
			<ProgressBar
				label="Score"
				value={joint.average}
				max={6}
				meter="bg-primary-500"
				track="bg-surface-300 dark:bg-surface-500"
			/>
		</div>
		<div class="flex place-items-center">
			<p class="pr-2">🍔</p>
			<ProgressBar
				label="Score"
				value={joint.food}
				max={6}
				meter="bg-secondary-500"
				track="bg-surface-300 dark:bg-surface-500"
			/>
		</div>
		<div class="flex place-items-center">
			<p class="pr-2">💰</p>
			<ProgressBar
				label="Score"
				value={joint.price}
				max={6}
				meter="bg-success-400"
				track="bg-surface-300 dark:bg-surface-500"
			/>
		</div>
		<div class="flex place-items-center">
			<p class="pr-2">🎉</p>
			<ProgressBar
				label="Score"
				value={joint.atmosphere}
				max={6}
				meter="bg-warning-300"
				track="bg-surface-300 dark:bg-surface-500"
			/>
		</div>
		<div class="flex place-items-center">
			<p class="pr-2">😎</p>
			<ProgressBar
				label="Score"
				value={joint.itFactor}
				max={6}
				meter="bg-tertiary-500"
				track="bg-surface-300 dark:bg-surface-500"
			/>
		</div>
		<!-- <p>
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
		</div> -->
		<div />
	</section>
	<footer class="card-footer flex justify-center">
		<span class="badge variant-ghost-secondary mr-2">{joint.city}</span>
		{#if joint.distance}
			<span class="badge variant-ghost-secondary">{joint.distance} km</span>
		{/if}
	</footer>
</a>
<!-- {#each { length: 6 - joint.food } as _}
<span><img src={grayBurger} alt="grayburger" /></span>
{/each} -->
