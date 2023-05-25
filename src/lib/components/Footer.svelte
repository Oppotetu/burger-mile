<script lang="ts">
	// import logo from '$lib/assets/logoGood.svg'
	import Icon from '@iconify/svelte'
</script>

<footer class="mt-14 p-12 text-primary-50 bg-surface-400-500-token">
	<div class="divide-x-surface-500 flex items-start justify-start divide-x">
		<div class="flex flex-col place-items-center space-y-4 pr-2 md:pr-10">
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
		<div class="px-2 md:px-10">
			<h4 class="pb-3">Navigation</h4>
			<ul class="space-y-1">
				<li><a href="/"><p class="text-white no-underline">Home</p></a></li>
				<li><a href="map"><p class="text-white no-underline">Map</p></a></li>
				<li><a href="catering"><p class="text-white no-underline">Catering</p></a></li>
				<li><a href="about"><p class="text-white no-underline">About</p></a></li>
			</ul>
		</div>
		<div class="space-y-3 pl-2 md:pl-10">
			<h4>Contact</h4>
			<p>tronmagnus@hotmail.com</p>
		</div>
	</div>
</footer>
