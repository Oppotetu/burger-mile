<script lang="ts">
	import type { Joint } from '$lib/types'
	import { ListBox, ListBoxItem, RadioGroup, RadioItem, drawerStore } from '@skeletonlabs/skeleton'
	import { sortByValue, reset } from '$lib/stores'

	$sortByValue = '_id'

	// export let length

	// let paginator = {
	// 	reset: 0,
	// 	limit: 5,
	// 	size: length,
	// 	amounts: [2, 5, 8, 12]
	// }

	// export function pagereset() {
	//   paginator.reset = 0
	// }

	function pageReset() {
		$reset = true
	}

	function drawerClose() {
		drawerStore.close()
	}
</script>

<RadioGroup
	rounded="rounded-container-token"
	display="flex-col"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	background="variant-glass-secondary"
>
	<RadioItem
		on:click={drawerClose}
		on:click={pageReset}
		bind:group={$sortByValue}
		name="sorting"
		value="average">Score</RadioItem
	>
	<RadioItem
		on:click={drawerClose}
		on:click={pageReset}
		bind:group={$sortByValue}
		name="sorting"
		value="food">Food</RadioItem
	>
	<RadioItem
		on:click={drawerClose}
		on:click={pageReset}
		bind:group={$sortByValue}
		name="sorting"
		value="price">Price</RadioItem
	>
	<RadioItem
		on:click={drawerClose}
		on:click={pageReset}
		bind:group={$sortByValue}
		name="sorting"
		value="atmosphere">Atmosphere</RadioItem
	>
	<RadioItem
		on:click={drawerClose}
		on:click={pageReset}
		bind:group={$sortByValue}
		name="sorting"
		value="itFactor">It-Factor</RadioItem
	>
	<RadioItem
		on:click={drawerClose}
		on:click={pageReset}
		bind:group={$sortByValue}
		name="sorting"
		value="distance">Proximity</RadioItem
	>
</RadioGroup>
