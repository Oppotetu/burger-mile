<script lang="ts">
	import Hello from './LeafletSearchComponent.svelte'
	export let inputBind: string
	export let searchArray: any
	export let onSelection: any

	const L: any = import('leaflet')

	L.Control.Search = L.Control.extend({
		options: {
			position: 'topright',
			placeholder: 'Search...'
		},
		initialize: function (options: any /*{data: {...} }*/) {
			// constructor
			L.Util.setOptions(this.options)
		},
		onAdd: function (map: any) {
			// var container = L.DomUtil.create('div', 'search-container')
			// this.form = L.DomUtil.create('form', 'form', container)
			// var group = L.DomUtil.create('div', 'form-group', this.form)
			// this.input = L.DomUtil.create('input', 'form-control input-sm', group)
			// this.input.type = 'text'
			// this.input.placeholder = this.options.placeholder
			// this.results = L.DomUtil.create('div', 'list-group', group)
			// L.DomEvent.addListener(this.input, 'keyup', this.keyup, this)
			// L.DomEvent.addListener(this.form, 'submit', this.submit, this)
			// // todo what happens when user click enter
			// L.DomEvent.disableClickPropagation(container)

			var searchComponent
			var container = L.DomUtil.create('div')

			searchComponent = new Hello({
				target: container,
				props: {
					inputBind: inputBind,
					searchArray: searchArray,
					onSelection: onSelection
					// onselect: onRestoSelection
				}
			})
			L.DomEvent.disableClickPropagation(container)

			return container
		},
		onRemove: function (map: any) {
			// when removed
			L.DomEvent.removeListener(this._input, 'keyup', this.keyup, this)
			// L.DomEvent.removeListener(form, 'submit', this.submit, this)
		},

		itemsSelected: function (e: any) {
			L.DomEvent.preventDefault(e)
		},
		submit: function (e: any) {
			L.DomEvent.preventDefault(e)
		}
	})

	L.control.search = function (/*id: any,*/ options: any) {
		return new L.Control.Search(/* id, */ options)
	}
</script>
