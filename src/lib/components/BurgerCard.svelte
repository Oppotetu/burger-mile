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

<!-- <div class="card variant-filled-secondary z-[9999] p-4" data-popup="popupHover">
	<p>Hover Content</p>
	<div class="arrow variant-filled-secondary" />
</div> -->

<a class="card card-hover w-80 md:w-60" href={`/${joint.slug.current}`}>
	<header class="card-header relative p-0">
		<img
			class="h-56 w-full rounded-md bg-black/50 md:h-64"
			src={$size.width <= 768
				? urlFor(joint.image.asset._ref).width(320).height(224).url()
				: urlFor(joint.image.asset._ref).width(240).height(256).url()}
			alt={joint.slug ? joint.slug.current : 'burger-image'}
		/>
		{#if joint.average}
			<span
				class="badge-icon absolute -bottom-2 -left-3 h-12 w-12 border-2 border-surface-900 text-base bg-surface-200-700-token dark:border-primary-500 dark:text-primary-500"
				>{joint.average}</span
			>
		{/if}
	</header>
	<section class="space-y-1 p-2 dark:bg-surface-800">
		<div class="mt-2 flex place-items-center justify-between">
			<span class="text-xl">
				{joint.name}
			</span>
			{#if joint.price === 1 || joint.price === 2}
				<span class="badge variant-ghost-success">$</span>
			{:else if joint.price === 3 || joint.price === 4}
				<span class="badge variant-ghost-success">$$</span>
			{:else if joint.price === 5 || joint.price === 6}
				<span class="badge variant-ghost-success">$$$</span>
			{/if}
		</div>
		<ul class="list -space-y-3">
			<li>
				<p>🍔</p>
				<ProgressBar
					label="Score"
					value={joint.food}
					max={6}
					meter="bg-secondary-500"
					track="bg-surface-300 dark:bg-surface-500"
				/>
			</li>
			<li>
				<p>🎉</p>
				<ProgressBar
					label="Score"
					value={joint.atmosphere}
					max={6}
					meter="bg-warning-300"
					track="bg-surface-300 dark:bg-surface-500"
				/>
			</li>
			<li>
				<p>😎</p>
				<ProgressBar
					label="Score"
					value={joint.itFactor}
					max={6}
					meter="bg-tertiary-500"
					track="bg-surface-300 dark:bg-surface-500"
				/>
			</li>
			<!-- <li>
				<p use:popup={popupHover}>🎲</p>
				<ProgressBar
					label="Score"
					value={joint.average}
					max={6}
					meter="bg-primary-500"
					track="bg-surface-300 dark:bg-surface-500"
				/>
			</li> -->
		</ul>
	</section>
	<footer class="card-footer flex justify-center">
		<span class="badge variant-ghost-secondary mr-2">{joint.city}</span>
		{#if joint.distance}
			<span class="badge variant-ghost-secondary">{joint.distance} km</span>
		{/if}
	</footer>
</a>
