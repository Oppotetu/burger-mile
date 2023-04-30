<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss'
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css'
	// Most of your app wide CSS should be put in this file
	import '../app.postcss'
	import {
		AppBar,
		AppShell,
		Drawer,
		LightSwitch,
		ListBox,
		ListBoxItem,
		drawerStore,
		type DrawerSettings
	} from '@skeletonlabs/skeleton'
	import Navigation from '$lib/components/Navigation.svelte'
	import menuHamburger from '$lib/assets/menu-hamburger.svg'
	import Sorting from '$lib/components/Sorting.svelte'
	import Footer from '$lib/components/Footer.svelte'

	let state: any = {
		sidebarLeft: false,
		sidebarRight: false
	}

	function toggle(key: string): void {
		state[key] = !state[key]
	}

	function triggerLeft(): void {
		const drawerSettings: DrawerSettings = { id: 'left', position: 'left' }
		drawerStore.open(drawerSettings)
	}
</script>

<Drawer height="h-max" width="w-max">
	{#if $drawerStore.id === 'left'}
		<Navigation />
	{:else if $drawerStore.id === 'right'}
		<Sorting />
	{/if}
</Drawer>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<AppShell slotSidebarLeft="hidden md:block md:visible bg-surface-500/10">
	<svelte:fragment slot="header">
		<AppBar slotTrail="">
			<svelte:fragment slot="lead">
				<img
					class="btn btn-sm mr-4 md:hidden"
					src={menuHamburger}
					alt="menu"
					on:click={triggerLeft}
				/>
				<strong class="text-2xl uppercase gradient-heading"><a href="/">Burgermile</a></strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="hidden md:block md:visible">
					<div class="flex flex-row md:space-x-10">
						<a href="map">Map</a>
						<a href="catering">Catering</a>
						<a href="about">About</a>
						<LightSwitch fillLight="fill-primary-400" fillDark="fill-tertiary-700" />
					</div>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if state.sidebarLeft}
			<Navigation />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		{#if state.sidebarRight}
			<Sorting />
		{/if}
	</svelte:fragment>
	<div class="container p-10 mx-auto">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
