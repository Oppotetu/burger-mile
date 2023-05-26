<script lang="ts">
	// import logo from '$lib/assets/logoGood.svg'
	import Icon from '@iconify/svelte'
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton'
	import { clickToCopyAction } from 'svelte-legos'

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	}
</script>

<div class="card bg-surface-300 p-4" data-popup="popupClick">
	<p>Copied</p>
	<div class="arrow variant-filled-secondary" />
</div>

<footer class="mt-6 p-12 text-primary-50 bg-surface-400-500-token md:mt-14">
	<div class="divide-x-surface-500 flex items-start justify-start divide-x">
		<div class="flex flex-col place-items-center space-y-4 pr-5 md:pr-10">
			<h4>Links</h4>
			<p>
				<a href="https://www.instagram.com/burgermile/">
					<Icon icon="mdi:instagram" width="30" class="variant-filled-surface" />
				</a>
			</p>
			<p>
				<a href="https://no.linkedin.com/in/tronsanderud">
					<Icon icon="mdi:linkedin" width="30" class="variant-filled-surface" />
				</a>
			</p>
		</div>
		<div class="hidden px-2 md:visible md:block md:px-10">
			<h4 class="pb-3">Navigation</h4>
			<ul class="space-y-1">
				<li><a href="/"><p class="text-white no-underline">Home</p></a></li>
				<li><a href="map"><p class="text-white no-underline">Map</p></a></li>
				<li><a href="catering"><p class="text-white no-underline">Catering</p></a></li>
				<li><a href="about"><p class="text-white no-underline">About</p></a></li>
			</ul>
		</div>
		<div class="space-y-3 pl-5 md:pl-10">
			<h4>Contact</h4>
			<p>tronmagnus@hotmail.com</p>
			<button use:clickToCopyAction={() => 'tronmagnus@hotmail.com'} use:popup={popupClick}>
				<Icon icon="iconamoon:copy-light" width="18" />
			</button>
		</div>
	</div>
</footer>
