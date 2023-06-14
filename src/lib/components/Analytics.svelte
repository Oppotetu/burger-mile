<script lang="ts">
	import { page } from '$app/stores'
	import { env } from '$env/dynamic/private'

	$: {
		if (typeof gtag !== 'undefined') {
			gtag('config', process.env.MEASUREMENT_ID, {
				page_title: document.title,
				page_path: $page.url.pathname
			})
		}
	}
</script>

<svelte:head>
	<script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.MEASUREMENT_ID}`}>
	</script>
	<script>
		window.dataLayer = window.dataLayer || []

		function gtag() {
			dataLayer.push(arguments)
		}

		gtag('js', new Date())
		gtag('config', process.env.MEASUREMENT_ID)
	</script>
</svelte:head>
