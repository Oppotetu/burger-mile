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
		drawerStore,
		type DrawerSettings,
		storePopup,
		type PopupSettings
	} from '@skeletonlabs/skeleton'
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom'
	import Navigation from '$lib/components/Navigation.svelte'
	import menuHamburger from '$lib/assets/menu-hamburger.svg'
	import Sorting from '$lib/components/Sorting.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import Icon from '@iconify/svelte'

	function triggerLeft(): void {
		const drawerSettings: DrawerSettings = { id: 'left', position: 'left' }
		drawerStore.open(drawerSettings)
	}

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })
</script>

<Drawer height="h-max" width="w-max" zIndex="z-[7777]">
	<Navigation />
</Drawer>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- <AppShell slotSidebarLeft="hidden md:block md:visible bg-surface-500/10"> -->
<AppShell slotSidebarLeft="w-0 md:w-max bg-surface-500/10">
	<!-- <svelte:fragment slot="header"> -->
	<!-- <img class="btn btn-sm mr-4 md:hidden" src={menuHamburger} alt="menu" on:click={triggerLeft} /> -->
	<!-- <AppBar>
			<svelte:fragment slot="lead">
			
				<strong class="gradient-heading text-2xl uppercase"><a href="/">Burgermile</a></strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="flex flex-row md:space-x-10">
					<a class="hidden md:visible md:block" href="https://www.instagram.com/burgermile/">
						<Icon icon="mdi:instagram" width="28" />
					</a>


					<LightSwitch fillLight="fill-primary-400" fillDark="fill-tertiary-700" />
				</div>
			</svelte:fragment>
		</AppBar> -->
	<!-- </svelte:fragment> -->
	<!-- <svelte:fragment slot="pageHeader">
		<h1>headae</h1>
	</svelte:fragment> -->
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<div class="container mx-auto p-10">
		<img
			class="btn btn-sm fixed left-1 top-1 z-[5555] mr-4 bg-secondary-300 md:hidden"
			src={menuHamburger}
			alt="menu"
			on:click={triggerLeft}
		/>
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>

<!-- <style>
	.page-header {
		background-color: lightseagreen;
		background-image: url(/src/lib/assets/images/fjell2.jpg);
		background-repeat: no-repeat;
		background-size: cover;
	}
</style> -->
