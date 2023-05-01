<script lang="ts">
	import { Autocomplete } from '@skeletonlabs/skeleton'

	export let inputBind: string
	export let searchArray: any
	export let onSelection: any
</script>

<div>
	<input
		class="peer input max-w-sm border-2 border-black bg-surface-50 text-black dark:bg-surface-50"
		type="search"
		name="demo"
		bind:value={inputBind}
		placeholder="Search..."
	/>
	<div
		class="card invisible max-h-48 w-full max-w-sm overflow-y-auto p-4 focus:outline-none active:visible peer-focus:visible dark:bg-surface-50 dark:text-black"
	>
		<Autocomplete bind:input={inputBind} options={searchArray} on:selection={onSelection} />
	</div>
</div>
