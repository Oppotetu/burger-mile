<script lang="ts">
	import { urlFor } from '$lib/config/images'
	import type { Joint } from '$lib/types'
	import Modal from './Modal.svelte'
	import iconDistance from '$lib/assets/icon-distance.png'
	import { calculateDistance } from '../CalculateDistance'
	import Geolocation from 'svelte-geolocation'

	let coords: any = []

	export let joint: Joint

	export let showModal: boolean = false
</script>

<Geolocation getPosition bind:coords />

<!-- on:click={() => (showModal = true)}
on:keydown={() => {
  showModal = false
}} -->

<a class="card card-hover overflow-hidden w-60" href={`/${joint.slug.current}`}>
	<header class="card-header p-0">
		<img
			class="rounded-md h-72 w-full bg-black/50"
			src={joint.image && urlFor(joint.image.asset._ref).width(235).height(330).url()}
			alt={joint.slug.current}
		/>
	</header>
	<section class="p-2 space-y-2 dark:bg-surface-800">
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
		<div class=" flex flex-row justify-center items-center">
			<img src={iconDistance} alt="icon-distance" class="w-5 pt-1" />
			<p>{joint.distance} km</p>
		</div>
	</section>
	<!-- <hr class="opacity-50" />
	<footer class="card-footer flex items-end">

	</footer> -->
</a>

<!-- "rounded-lg h-72 shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30 dark:shadow-white/70" -->

{#if showModal == true}
	<Modal bind:showModal>
		<h2 slot="header" class="m-0 text-center">{joint.name}</h2>
		<p>{joint.review}</p>
		<div class="flex flex-row p-8 justify-evenly content-between">
			<div class="flex flex-col place-content-between">
				<div>
					<p class="m-0">Type: {joint.gourmetOrJoint}</p>
					<p class="m-0">City: {joint.city}</p>

					<p class="m-0">🎲: {joint.average}</p>
					<p class="m-0">
						Food:
						{#each { length: joint.food } as _}
							<span>🍔</span>
						{/each}
						<!-- {#each { length: 6 - joint.food } as _}
          <span><img src={grayBurger} alt="grayburger" /></span>
        {/each} -->
					</p>
					<p class="m-0">
						Price:
						{#each { length: joint.price } as _}
							<span>💰</span>
						{/each}
					</p>
					<p class="m-0">
						Atmosphere:
						{#each { length: joint.atmosphere } as _}
							<span>🎉</span>
						{/each}
					</p>
					<p class="m-0">
						It-factor:
						{#each { length: joint.itFactor } as _}
							<span>😎</span>
						{/each}
					</p>
				</div>

				<p class="w-56">{joint.hashtags}</p>
			</div>
		</div>
	</Modal>
{/if}
