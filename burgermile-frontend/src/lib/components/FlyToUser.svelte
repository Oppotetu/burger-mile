<script lang="ts">
	// import locationArrow from '$lib/assets/location-arrow.svg'
	import Icon from '@iconify/svelte'
	export let handleClick: any
</script>

<div>
	<button
		class="btn btn-icon border-black border-2 bg-surface-50 w-9"
		type="button"
		on:click={handleClick}
	>
		<Icon icon="fluent:location-arrow-12-regular" width="23" color="black" />
	</button>
</div>
