<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton'
	import { onMount } from 'svelte'
	import { quintOut } from 'svelte/easing'
	import { crossfade } from 'svelte/transition'

	export let usePopup: any
	export let sortByValue: string

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '' : style.transform

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			}
		}
	})

	let uid = 1

	let buttons = [
		{ id: uid++, moved: false, content: 'top button' },
		{ id: uid++, moved: true, content: 'moved button' }
	]

	let buttonIsUp = true
	let upperPara: Element | null

	function handleClick() {
		if (buttonIsUp) {
			buttonIsUp = false
		} else {
			buttonIsUp = true
		}
		console.log(buttonIsUp)
	}
	onMount(() => {
		upperPara = document.getElementById('upperPara')

		function isElementInViewport(el: Element) {
			const rect = el.getBoundingClientRect()
			return (
				rect.top >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
			)
		}

		const callbackFunction = async () => {
			if (upperPara) {
				if (!isElementInViewport(upperPara) && buttonIsUp === true) {
					buttonIsUp = false
					// console.log('added visible')
				}
				if (isElementInViewport(upperPara) && buttonIsUp === false) {
					buttonIsUp = true
				}
			}
		}
		// callbackFunction()

		document.getElementById('page')?.addEventListener('scroll', function () {
			callbackFunction()
		})
	})
</script>

{#if buttonIsUp}
	<button
		in:receive={{ key: buttons[0].id, duration: 2500 }}
		out:send={{ key: buttons[0].id, duration: 2500 }}
		use:popup={usePopup}
		class="btn variant-filled-primary w-48"
	>
		{sortByValue === 'average'
			? 'Score'
			: sortByValue === '_id'
			? 'Sort by'
			: sortByValue.charAt(0).toUpperCase() + sortByValue.slice(1)}
	</button>
{/if}

{#if buttonIsUp === false}
	<button
		in:receive={{ key: buttons[0].id, duration: 2500 }}
		out:send={{ key: buttons[0].id, duration: 2500 }}
		use:popup={usePopup}
		class="btn variant-filled-primary fixed bottom-16 left-20 w-48"
	>
		{sortByValue === 'average'
			? 'Score'
			: sortByValue === '_id'
			? 'Sort by'
			: sortByValue.charAt(0).toUpperCase() + sortByValue.slice(1)}
	</button>
{/if}

<!-- id="sticky-button"  -->
