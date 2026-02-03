<script lang="ts">
	import { buttonIsUp } from '$lib/stores'
	import { onMount } from 'svelte'
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton'
	import { crossfade } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import { sortByValue } from '$lib/stores'

	let upperPara: Element | null

	$: $sortByValue = '_id'

	let popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'combobox',
		placement: 'bottom',
		// Close the popup when the item is clicked
		closeQuery: '.listbox-item'
	}

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '' : style.transform

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `transform: ${transform} scale(${t});
					opacity: ${t * 0.5}`
			}
		}
	})

	onMount(() => {
		upperPara = document.getElementById('last-para')

		function isElementInViewport(el: Element) {
			const rect = el.getBoundingClientRect()
			return (
				rect.top >= 30 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
			)
		}

		const callbackFunction = async () => {
			if (upperPara) {
				if (!isElementInViewport(upperPara) && $buttonIsUp === true) {
					$buttonIsUp = false
				}
				if (isElementInViewport(upperPara) && $buttonIsUp === false) {
					$buttonIsUp = true
				}
			}
		}
		callbackFunction()

		document.getElementById('page')?.addEventListener('scroll', function () {
			callbackFunction()
		})
	})
</script>

<!-- { page: 'landing', title: 'Welcome to Burgermile' },
{ page: 'map', title: 'Map' },
{ page: 'catering', title: 'Catering' },
{ page: 'about', title: 'Discovering the world one burger at a time' } -->

{#if $buttonIsUp === false}
	<button
		in:receive|local={{ key: 'button-id', duration: 400 }}
		out:send|local={{ key: 'button-id', duration: 400 }}
		use:popup={popupCombobox}
		class="btn btn-icon variant-filled-primary fixed right-1 top-[14%] z-[777] w-24 md:right-4 md:top-[25%]"
	>
		{$sortByValue === 'average'
			? 'Score'
			: $sortByValue === 'distance'
			? 'Proximity'
			: $sortByValue === 'itFactor'
			? 'It-Factor'
			: $sortByValue === '_id'
			? 'Sort by'
			: $sortByValue.charAt(0).toUpperCase() + $sortByValue.slice(1)}
	</button>
{/if}

<div class="background flex flex-col pt-3 text-center text-black">
	<h1 class="pt-2 font-semibold text-primary-900">Welcome to Burgermile</h1>
	<h3 class="mx-20 flex-grow font-medium text-black">Discovering the world one burger at a time</h3>
	<div id="last-para" class="h-10 pb-16 md:pb-20 xl:pb-28">
		{#if $buttonIsUp}
			<button
				in:receive|local={{ key: 'button-id', duration: 400 }}
				out:send|local={{ key: 'button-id', duration: 400 }}
				use:popup={popupCombobox}
				class="btn variant-filled-primary w-48"
			>
				{$sortByValue === 'average'
					? 'Score'
					: $sortByValue === 'distance'
					? 'Proximity'
					: $sortByValue === 'itFactor'
					? 'It-Factor'
					: $sortByValue === '_id'
					? 'Sort by'
					: $sortByValue.charAt(0).toUpperCase() + $sortByValue.slice(1)}
			</button>
		{/if}
	</div>
</div>

<style>
	.background {
		@apply bg-surface-900;
		background-image: url(/src/lib/assets/images/fjell2.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		background-position-y: start;
		height: 70vh;
	}

	@media (min-width: 768px) {
		.background {
			background-position-y: start;
		}
	}

	@media (min-width: 1024px) {
		.background {
			background-position-y: 14%;
		}
	}

	@media screen and (min-width: 1280px) {
		.background {
			background-position-y: 42%;
		}
	}
</style>
