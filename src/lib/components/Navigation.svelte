<script lang="ts">
	import { AppRail, AppRailTile, LightSwitch, drawerStore } from '@skeletonlabs/skeleton'
	import { writable, type Writable } from 'svelte/store'
	import Icon from '@iconify/svelte'
	import logo from '$lib/assets/burgermileLogoBg.png'

	function drawerClose(): void {
		drawerStore.close()
	}

	const storeValue: Writable<number> = writable(0)
</script>

<AppRail selected={storeValue} width="w-28 p-0 m-0">
	<svelte:fragment slot="lead">
		<AppRailTile on:click={drawerClose} tag="a" href="/" label="Home" value={0}>
			<img src={logo} alt="logo" class="w-12" />
		</AppRailTile>
		<AppRailTile on:click={drawerClose} tag="a" href="map" label="Map" value={1}>
			<Icon icon="mdi:map-legend" width="35" />
		</AppRailTile>
		<AppRailTile on:click={drawerClose} tag="a" href="catering" label="Catering" value={2}>
			<Icon icon="material-symbols:restaurant" width="35" />
		</AppRailTile>
		<AppRailTile on:click={drawerClose} tag="a" href="about" label="About" value={3}>
			<Icon icon="mdi:web" width="35" />
		</AppRailTile>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<AppRailTile value={4}>
			<a href="https://www.instagram.com/burgermile/">
				<Icon icon="mdi:instagram" width="35" />
			</a>
		</AppRailTile>
	</svelte:fragment>
</AppRail>

<!-- <nav class="list-nav p-4">
	<ul>
		<li><a href="/" on:click={drawerClose}>Home</a></li>
		<li><a href="map" on:click={drawerClose}>Map</a></li>
		<li><a href="catering" on:click={drawerClose}>Catering</a></li>
		<li><a href="about" on:click={drawerClose}>About</a></li>
	</ul>
</nav> -->
