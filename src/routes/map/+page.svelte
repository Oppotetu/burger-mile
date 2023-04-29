<script lang="ts">
	import { browser } from '$app/environment'
	import type { LatLngExpression, LayerGroup, Map } from 'leaflet'
	import { onDestroy, onMount } from 'svelte'
	// import burgerImage from '../../../assets/burger.svg'
	// import burgerShadow from '../../../assets/burger-shadow.png'

	export let data

	let mapElement: any
	let map: any
	let markerLayers

	const initialView: LatLngExpression = [59.92859218403887, 10.719395507025505]

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet')
			// const { Marker } = await import("svelte-leafletjs")

			map = leaflet.map(mapElement).setView(initialView, 12)

			markerLayers = leaflet.layerGroup().addTo(map)

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map)

			// let customMarker = leaflet.icon({
			// 	iconUrl: burgerImage,
			// 	shadowUrl: burgerShadow,
			// 	iconSize: [70, 70],
			// 	shadowSize: [50, 60],
			// 	shadowAnchor: [15, 42]
			// })

			function getMarkerLocations() {
				for (let i of data.restos) {
					let coords: LatLngExpression = [i.latLng.lat, i.latLng.lng]
					leaflet.marker(coords).addTo(map).bindPopup(`
            ${i.name} <hr> 
            🎲Score: ${i.average}
            `)
					// 🍔: ${i.food}
					// 💰: ${i.price} <br>
					// 🎉: ${i.atmosphere}
					// 😎: ${i.itFactor}
					// `)
				}
			}
			// , { icon: customMarker }

			getMarkerLocations()

			map.locate({ setView: false, watch: false })
		}
	})

	onDestroy(async () => {
		if (map) {
			console.log('Unloading leaflet map')
			map.remove()
		}
	})

	function resizeMap() {
		if (map) {
			map.invalidateSize()
		}
	}

	function resetMapView() {
		map.setView(initialView, 5)
	}
</script>

<svelte:window on:resize={resizeMap} />

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
		integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
		crossorigin=""
	/>

	<script
		src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
		integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
		crossorigin=""
	>
	</script>
</svelte:head>

<main>
	<div class="map" bind:this={mapElement} />
</main>

<!-- <script>
  import { onMount, onDestroy } from 'svelte';

	let map;
  let mapElement;
	
	let lat = 29.8283;
	let lng = -96.5795;
	$: markerLocation = [lat, lng];
	$: initialView = markerLocation;

  onMount(async () => {
    L = (await import('leaflet')).default;

    map = createMap(mapElement); 
		
		markerLayers = L.layerGroup()
		markerLayers.addTo(map);
  });
	
	function createMap(container) {
	  let m = L.map(container, {preferCanvas: true }).setView(initialView, 5);
    L.tileLayer(
	    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
	    {
	      attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
	        &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
	      subdomains: 'abcd',
	      maxZoom: 14,
	    }
	  ).addTo(m);

    return m;
  }

	function createMarker(loc) {
		let count = Math.ceil(Math.random() * 25);
		let marker = L.marker(loc);
		
		return marker;
	}

	let markerLayers;

	function resizeMap() {
	  if(map) { map.invalidateSize(); }
  }
	
	$: if(map && markerLocation && markerLayers) {
		let m = createMarker(markerLocation);
		map.setView(markerLocation);
		markerLayers.clearLayers();
		markerLayers.addLayer(m);
	}

</script>
<svelte:window on:resize={resizeMap} />

<style>
	.map :global(.marker-text) {
		width:100%;
		text-align:center;
		font-weight:600;
		background-color:#444;
		color:#EEE;
		border-radius:0.5rem;
	}
	
	.map :global(.map-marker) {
		width:30px;
		transform:translateX(-50%) translateY(-25%);
	}
</style>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
<input type="number" bind:value={lat}/>
<input type="number" bind:value={lng} />
<div class="map" style="height:300px;width:100%" bind:this={mapElement} /> -->

<style>
	/* @import "leaflet/dist/leaflet.css"; */
	main div {
		height: 800px;
	}

	.map :global(.leaflet-marker-icon) {
		background-color: transparent;
		border: 0;
		color: bisque;
	}
	/* .map :global(.leaflet-control-zoom-in) {
		padding: 0%;
	}
	.map :global(.leaflet-control-zoom-out) {
		padding: 0%;
	} */
</style>
