<script lang="ts">
	import Icon from '@iconify/svelte'
	export let handleClick: any
	// export let src: any
</script>

<div>
	<button class="btn btn-icon bg-slate-400 w-9" type="button" on:click={handleClick}>
		<Icon icon="system-uicons:reset-temporary" width="28" />
	</button>
</div>
