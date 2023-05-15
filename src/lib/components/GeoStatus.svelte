<script lang="ts">
	import { onMount } from 'svelte'
	import { userGeoStatus } from '$lib/stores'

	onMount(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					let lat = position.coords.latitude
					let lng = position.coords.longitude
					$userGeoStatus = [lat, lng]
				},
				function error(msg) {
					alert('Please enable your GPS position feature.')
				},
				{ maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
			)
		} else {
			alert('Geolocation API is not supported in your browser.')
		}
	})
</script>
