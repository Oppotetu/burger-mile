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
	import Icon from '@iconify/svelte'
	import LandingHeader from '$lib/components/headers/LandingHeader.svelte'
	import { page } from '$app/stores'
	import Analytics from '$lib/components/Analytics.svelte'

	function triggerLeft(): void {
		const drawerSettings: DrawerSettings = { id: 'left', position: 'left' }
		drawerStore.open(drawerSettings)
	}

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })
</script>

<Analytics />

<Drawer width="w-max" zIndex="z-[7777]">
	<Navigation />
</Drawer>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- <AppShell slotSidebarLeft="hidden md:block md:visible bg-surface-500/10"> -->
<AppShell slotSidebarLeft="w-0 md:w-max bg-surface-500/10" slotHeader="md:hidden">
	<svelte:fragment slot="header">
		<AppBar padding="p-2 px-4" class="h-12 place-content-center">
			<svelte:fragment slot="lead">
				<!-- <strong class="gradient-heading text-2xl uppercase"><a href="/">Burgermile</a></strong> -->
				<button on:click={triggerLeft}>
					<Icon icon="ic:round-menu" width="42" />
				</button>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch fillLight="fill-primary-400" fillDark="fill-tertiary-700" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		{#if $page.route.id === '/'}
			<LandingHeader />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<div class="container mx-auto px-6">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
