<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton'

	export let usePopup: any
	export let sortByValue: string
</script>

<div />

<button id="sticky-button" class="btn variant-filled-primary w-48" use:popup={usePopup}>
	{sortByValue === 'average'
		? 'Score'
		: sortByValue === '_id'
		? 'Sort by'
		: sortByValue.charAt(0).toUpperCase() + sortByValue.slice(1)}
</button>
