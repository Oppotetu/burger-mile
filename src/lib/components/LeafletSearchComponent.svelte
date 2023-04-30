<script lang="ts">
	import { Autocomplete } from '@skeletonlabs/skeleton'

	export let inputBind: string
	export let searchArray: any
	export let onSelection: any
</script>

<div>
	<input
		class="input max-w-sm peer"
		type="search"
		name="demo"
		bind:value={inputBind}
		placeholder="Search..."
	/>
	<div
		class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto focus:outline-none invisible peer-focus:visible active:visible"
	>
		<Autocomplete bind:input={inputBind} options={searchArray} on:selection={onSelection} />
	</div>
</div>
