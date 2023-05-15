<script lang="ts">
	import { buttonIsUp } from '$lib/stores'
	import { onMount } from 'svelte'
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton'
	import { crossfade } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	let upperPara: Element | null

	export let sortByValue: string = '_id'

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
		// callbackFunction()

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
		in:receive={{ key: 'button-id', duration: 400 }}
		out:send={{ key: 'button-id', duration: 400 }}
		use:popup={popupCombobox}
		class="btn btn-icon variant-filled-primary fixed right-1 top-[14%] z-[777] w-24"
	>
		{sortByValue === 'average'
			? 'Score'
			: sortByValue === '_id'
			? 'Sort by'
			: sortByValue.charAt(0).toUpperCase() + sortByValue.slice(1)}
	</button>
{/if}

<div class="background flex flex-col pt-3 text-center text-black">
	<h1 class="pt-2 font-semibold text-primary-900">Welcome to Burgermile</h1>
	<h3 class="mx-20 flex-grow font-medium text-black">Discovering the world one burger at a time</h3>
	<div id="last-para" class="h-10 pb-16 md:pb-20 lg:pb-28">
		{#if $buttonIsUp}
			<button
				in:receive={{ key: 'button-id', duration: 400 }}
				out:send={{ key: 'button-id', duration: 400 }}
				use:popup={popupCombobox}
				class="btn variant-filled-primary w-48"
			>
				{sortByValue === 'average'
					? 'Score'
					: sortByValue === '_id'
					? 'Sort by'
					: sortByValue.charAt(0).toUpperCase() + sortByValue.slice(1)}
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
		height: 60vh;
	}

	@media screen and (min-width: 1024px) {
		.background {
			background-position-y: 42%;
			height: 70vh;
		}
	}
</style>