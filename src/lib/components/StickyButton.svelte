<script lang="ts">
	let y: number
	export let triggerRight: any
</script>

<svelte:window bind:scrollY={y} />

<div />

<button
	id="sticky-button"
	type="button"
	class="btn btn-xl variant-filled-primary"
	on:click={triggerRight}>Sort by</button
>
