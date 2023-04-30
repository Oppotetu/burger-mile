<script lang="ts">
	// import locationArrow from '$lib/assets/location-arrow.svg'
	import Icon from '@iconify/svelte'
	export let handleClick: any
</script>

<div>
	<button class="btn btn-icon bg-slate-400 w-9" type="button" on:click={handleClick}>
		<Icon icon="fluent:location-arrow-12-regular" width="23" />
	</button>
</div>
