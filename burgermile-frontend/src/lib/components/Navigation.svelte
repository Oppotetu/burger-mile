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

<AppRail {selected} width="w-24" regionTrail="hidden md:visible md:block">
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
		<AppRailTile value={4} label="Instagram">
			<a href="https://www.instagram.com/burgermile/">
				<Icon icon="mdi:instagram" width="35" />
			</a>
		</AppRailTile>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="flex h-20 flex-col place-content-center place-items-center xl:h-20">
			<LightSwitch fillLight="fill-primary-400" fillDark="fill-tertiary-700" />
		</div>
		<!-- <AppRailTile value={5}>
		</AppRailTile> -->
	</svelte:fragment>
</AppRail>
