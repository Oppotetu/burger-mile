<script lang="ts">
	// import logo from '$lib/assets/logoGood.svg'
	import Icon from '@iconify/svelte'
</script>

<footer class="mt-14 p-12 text-primary-50 bg-surface-400-500-token">
	<div class="flex justify-evenly">
		<div class="flex flex-col place-items-center space-y-4">
			<h4>Links</h4>
			<p>
				<a href="https://www.instagram.com/burgermile/">
					<Icon icon="mdi:instagram" width="30" />
				</a>
			</p>
			<p>
				<a href="https://no.linkedin.com/in/tronsanderud">
					<Icon icon="mdi:linkedin" width="30" />
				</a>
			</p>
		</div>
		<div>
			<ul class="space-y-3 text-center">
				<li><a class="no-underline" href="map">Map</a></li>
				<li><a class="no-underline" href="/">Home</a></li>
				<li><a class="no-underline" href="catering">Catering</a></li>
				<li><a class="no-underline" href="about">About</a></li>
			</ul>
		</div>
		<div class="space-y-3">
			<h4>Contact</h4>
			<ul>
				<li>mailadresse</li>
				<li>more</li>
				<li>morsfesf</li>
			</ul>
		</div>
	</div>
	<div />
</footer>
