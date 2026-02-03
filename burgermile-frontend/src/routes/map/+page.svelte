<script lang="ts">
	import type { LatLngExpression, LayerGroup, Map } from 'leaflet'
	import { browser } from '$app/environment'
	import { onDestroy, onMount } from 'svelte'
	// import locationArrow from '$lib/assets/location-arrow.svg'
	import locationSvg from '$lib/assets/location.svg'

	import { createEventDispatcher } from 'svelte'
	import type { AutocompleteOption } from '@skeletonlabs/skeleton'
	import LeafletSearch from '$lib/components/LeafletSearch.svelte'
	import { page } from '$app/stores'
	import LeafletSearchComponent from '$lib/components/LeafletSearchComponent.svelte'
	import FlyToUser from '$lib/components/FlyToUser.svelte'
	import ResetView from '$lib/components/ResetView.svelte'

	export let data

	let mapElement: any
	let map: any
	let markerLayers

	const initialView: LatLngExpression = [59.92859218403887, 10.745395507025505]

	let inputResto: string = ''

	const searchRestos: AutocompleteOption[] = []

	$: {
		for (let i of Object.entries(data.restos)) {
			searchRestos.push({ label: i[1].name, value: i[1].slug?.current })
		}
	}

	const handleReset = () => {
		map.setView(initialView, 12)
	}

	const handleFly = () => {
		map.locate({
			setView: true,
			maxzoom: 8,
			enableHighAccuracy: true
		})
	}

	function onRestoSelection(e: any): void {
		inputResto = e.detail.value
		console.log(inputResto)
		var feature = Object.entries(data.restos).find(function (x) {
			return x[1].slug.current === inputResto
		})
		console.log(feature)
		if (feature) {
			map.setView([feature[1].latLng.lat, feature[1].latLng.lng], 15)
		}
	}

	onMount(async () => {
		if (browser) {
			document.getElementById('page')?.scrollTo(0, 0)

			const L: any = await import('leaflet')
			const { Marker } = await import('svelte-leafletjs')

			map = L.map(mapElement).setView(initialView, 12)

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map)

			if ($page.url.searchParams.has('setView')) {
				let setFromSearchParams = $page.url.searchParams.get('setView')
				console.log(setFromSearchParams)
				let feature = Object.entries(data.restos).find(function (x) {
					return x[1].slug.current === setFromSearchParams
				})
				console.log(feature)
				if (feature) {
					map.setView([feature[1].latLng.lat, feature[1].latLng.lng], 15)
				}
			}

			// SEARCH
			L.Control.Search = L.Control.extend({
				onAdd: function (map: any) {
					var container = L.DomUtil.create('div')

					new LeafletSearchComponent({
						target: container,
						props: {
							inputBind: inputResto,
							searchArray: searchRestos,
							onSelection: onRestoSelection
						}
					})
					L.DomEvent.disableClickPropagation(container)

					return container
				},
				onRemove: function (map: any) {
					// when removed
					// L.DomEvent.removeListener(this._input, 'keyup', this.keyup, this)
					// L.DomEvent.removeListener(form, 'submit', this.submit, this)
				}
			})

			L.control.search = function (/*id: any,*/ options: any) {
				return new L.Control.Search(/* id, */ options)
			}

			// RESETVIEW
			L.Control.ResetView = L.Control.extend({
				onAdd: function (map: any) {
					var container = L.DomUtil.create('div')

					L.DomEvent.addListener(container, 'click', L.DomEvent.stopPropagation).addListener(
						container,
						'click',
						L.DomEvent.preventDefault
					)

					let some = new ResetView({
						target: container,
						props: {
							handleClick: handleReset
						}
					})

					return container
				},

				onRemove: function (map: any) {
					// L.DomEvent.off()
				}
			})

			L.control.resetView = function (options: any) {
				return new L.Control.ResetView(options)
			}

			// FLYTOUSER
			L.Control.FlyToUser = L.Control.extend({
				onAdd: function (map: any) {
					var container = L.DomUtil.create('div')

					let some = new FlyToUser({
						target: container,
						props: {
							handleClick: handleFly
						}
					})

					return container
				},

				onRemove: function (map: any) {
					// L.DomEvent.off()
				}
			})

			L.control.flyToUser = function (options: any) {
				return new L.Control.FlyToUser(options)
			}

			// TOOLBAR
			// let toolbar = L.control({ position: 'topleft' })
			// let toolbarComponent: any

			// toolbar.onAdd = (map: any) => {
			// 	let div = L.DomUtil.create('div')
			// 	toolbarComponent = new Hello({
			// 		target: div,
			// 		props: {}
			// 	})

			// 	toolbarComponent.$on('click-reset', () => {
			// 		map.setView(initialView, 5)
			// 	})

			// 	return div
			// }
			// toolbar.onRemove = () => {
			// 	if (toolbarComponent) {
			// 		toolbarComponent.$destroy()
			// 		toolbarComponent = null
			// 	}
			// }
			// toolbar.addTo(map)

			// MARKERLAYER
			markerLayers = L.layerGroup().addTo(map)

			function getMarkerLocations() {
				for (let i of data.restos) {
					if (i.latLng) {
						let coords: LatLngExpression = [i.latLng.lat, i.latLng.lng]
						L.marker(coords)
							.addTo(map)
							.bindPopup(
								`<h4> ${i.name} </h4>
                <p>🎲Score: ${i.average}</p>
                <p><a href=${i.slug?.current}>Read more</a></p>`
							)
					}
				}
			}

			var userIcon = L.icon({
				iconUrl: locationSvg,
				iconSize: [41, 41],
				iconAnchor: [20, 41],
				popupAnchor: [1, -34],
				tooltipAnchor: [16 - 28]
			})

			getMarkerLocations()

			navigator.geolocation.getCurrentPosition(function (position) {
				console.log(position)
				if (position.coords.latitude && position.coords.longitude) {
					L.marker([position.coords.latitude, position.coords.longitude], {
						icon: userIcon
					}).addTo(map)
				}
			})

			L.control.search({ position: 'topright' }).addTo(map)

			L.control.resetView({ position: 'topleft' }).addTo(map)

			L.control.flyToUser({ position: 'topleft' }).addTo(map)

			// map.locate({ setView: true, watch: false })
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
	<title>Map Burgermile</title>

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

<!-- <div class="container mx-auto flex flex-col justify-center text-center">
	<h1 class="p-2 md:p-6">Map</h1> -->

<!-- <hr class="py-6 md:py-8" /> -->
<main class="h-screen">
	<div class="map h-full" bind:this={mapElement} />
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

	
	$: if(map && markerLocation && markerLayers) {
		let m = createMarker(markerLocation);
		map.setView(markerLocation);
		markerLayers.clearLayers();
		markerLayers.addLayer(m);
	}

</script>

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
	@import 'leaflet/dist/leaflet.css';
	/* main div {
		height: 800px;
	} */

	/* .map :global(.leaflet-marker-icon) {
		background-color: transparent;
		border: 0;
		color: bisque;
	} */
	.map :global(.leaflet-popup-content) {
		text-align: center;
	}
	.map :global(.leaflet-control-zoom) {
		border-width: 2px;
		border-color: black;
	}
	.map :global(.leaflet-control-zoom-in) {
		text-decoration: none !important;
		@apply bg-surface-50;
	}

	.map :global(.leaflet-control-zoom-in span) {
		color: black;
	}

	.map :global(.leaflet-control-zoom-out) {
		text-decoration: none !important;
		@apply bg-surface-50;
	}
	.map :global(.leaflet-control-zoom-out span) {
		color: black;
	}
</style>
