<script lang="ts">
	import drobak from '$lib/assets/images/drobak.jpg'
	import { onMount } from 'svelte'

	onMount(() => {
		document.getElementById('page')?.scrollTo(0, 0)
	})
</script>

<svelte:head>
	<title>Catering Burgermile</title>
</svelte:head>

<div class="container mx-auto flex flex-col justify-center text-center">
	<h1 class="p-2 md:p-6">Catering</h1>
	<hr class="py-6 md:py-8" />

	<div class=" text-left md:pb-8">
		<div class="-mt-3 pb-6 md:float-left md:w-1/2 md:pb-8 md:pr-12 lg:mt-0 lg:px-20 lg:pb-12">
			<h3 class="pb-4">
				You can order Burgermile catering <a
					href="https://burgermile.typeform.com/to/xCuErE?typeform-source=l.instagram.com">here</a
				>
			</h3>
			<p>
				Welcome to our website, where we offer high-quality burger catering services for events and
				private functions in Norway. We are passionate about burgers and believe that they are the
				perfect food for any occasion, from corporate events to weddings and everything in between.
				Our menu features a variety of burger options, including classic cheeseburgers, gourmet
				creations, and plant-based options to cater to all dietary requirements. We use only the
				freshest ingredients and locally sourced produce to ensure that our burgers are of the
				highest quality and taste delicious. At Burgermile, we pride ourselves on providing
				exceptional customer service and attention to detail.
			</p>
		</div>
		<div class="pb-4 md:float-right md:w-1/2">
			<div class="lg:flex lg:justify-center">
				<img class="rounded-md bg-black/50 md:max-w-sm lg:max-w-md" src={drobak} alt="sea-burger" />
			</div>
		</div>
	</div>
</div>

<!-- <p>
  We work closely with our clients to create
			customized menus that meet their specific needs and budget, and we are committed to ensuring
			that every event is a success. In addition to our burger catering services, we also offer a
			range of extras to enhance your event, including sides, drinks, and desserts. Our team of
			experienced chefs and servers will take care of everything, leaving you free to enjoy your
			event and entertain your guests. Whether you're planning a corporate event, wedding, or
			private party, we have the expertise and experience to make it a success. Contact us today to
			learn more about our burger catering services and to schedule your event.
</p> -->
