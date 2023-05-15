<script lang="ts">
	import { AppRail, AppRailTile, LightSwitch, drawerStore } from '@skeletonlabs/skeleton'
	import { derived, writable, type Writable } from 'svelte/store'
	import Icon from '@iconify/svelte'
	import logo from '$lib/assets/logoGood.svg'
	import { page } from '$app/stores'

	function drawerClose(): void {
		drawerStore.close()
	}

	const selected: Writable<number> = writable(0)
	// const selected = derived(page, ($page) => $page.url.pathname)
</script>

<AppRail {selected} width="w-28 p-0 m-0" regionTrail="hidden md:block md:visible">
	<svelte:fragment slot="lead">
		<AppRailTile on:click={drawerClose} value={0} tag="a" href="/" label="Home">
			<img src={logo} alt="logo" class="w-12" />
		</AppRailTile>
		<AppRailTile on:click={drawerClose} value={1} tag="a" href="map" label="Map">
			<Icon icon="mdi:map-legend" width="35" />
		</AppRailTile>
		<AppRailTile on:click={drawerClose} value={2} tag="a" href="catering" label="Catering">
			<Icon icon="material-symbols:restaurant" width="35" />
		</AppRailTile>
		<AppRailTile on:click={drawerClose} value={3} tag="a" href="about" label="About">
			<Icon icon="mdi:web" width="35" />
		</AppRailTile>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<AppRailTile value={4}>
			<a href="https://www.instagram.com/burgermile/">
				<Icon icon="mdi:instagram" width="35" />
			</a>
		</AppRailTile>
		<AppRailTile value={5}>
			<LightSwitch fillLight="fill-primary-400" fillDark="fill-tertiary-700" />
		</AppRailTile>
	</svelte:fragment>
</AppRail>
