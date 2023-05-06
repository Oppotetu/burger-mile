<script lang="ts">
	import logo from '$lib/assets/burgermileLogoBg.png'
	import Icon from '@iconify/svelte'
</script>

<footer class="flex justify-center bg-surface-100 p-2 dark:bg-surface-800">
	<div class="flex flex-col justify-center space-y-6 text-center">
		<img src={logo} alt="logo" class="h-28" />

		<p class="font-bold">
			Corp goes here <br />Reviews and catering since 2020
		</p>
		<p>Copyright goes here</p>

		<div class="grid grid-flow-col gap-4">
			<a href="https://no.linkedin.com/in/tronsanderud">
				<Icon icon="mdi:linkedin" width="30" />
			</a>
			<a href="https://www.instagram.com/burgermile/">
				<Icon icon="mdi:instagram" width="30" />
			</a>
			<a href="about">
				<Icon icon="material-symbols:mail-outline" width="30" />
			</a>
		</div>
	</div>
</footer>

<!-- <footer class="page-footer">
	<span>made by </span>
	<a href="https://georgemartsoukos.com/" target="_blank">
		<img
			width="24"
			height="24"
			src="https://assets.codepen.io/162656/george-martsoukos-small-logo.svg"
			alt="George Martsoukos logo"
		/>
	</a>
</footer> -->

<!-- 
	.page-footer {
		position: fixed;
		right: 0;
		bottom: 20px;
		display: flex;
		align-items: center;
		padding: 5px;
		color: black;
		background: rgba(255, 255, 255, 0.65);
	}

	.page-footer a {
		display: flex;
		margin-left: 4px;
	} -->
