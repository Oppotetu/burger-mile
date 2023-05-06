<script lang="ts">
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import {
		Timeline,
		TimelineItem,
		TimelineSeparator,
		TimelineDot,
		TimelineConnector,
		TimelineContent,
		TimelineOppositeContent
	} from 'svelte-vertical-timeline'
	import { element } from 'svelte/internal'
	import { fade, fly, scale, slide } from 'svelte/transition'
	import fjell2 from '$lib/assets/images/fjell2.jpg'

	const options: {
		title: string
		time: string
		description: string
		visible: boolean
		side: boolean
		long: boolean
	}[] = [
		{
			title: 'Inception',
			time: '13th of Mars 2015',
			description:
				'The idea behind rating burgers comes to life. Burgermile was on exchange in New Zealand and on a road trip. He had burger for dinner 12 days in a row. He started systemizing the reviews in order to be able to look back on where to find good burger restaurants.',
			visible: false,
			side: true,
			long: true
		},
		{
			title: 'First instagram post',
			time: '15th of August 2016',
			description:
				'First pictures published at Burgermile instagram after having a burger on Munchies in Oslo.',
			visible: false,
			side: false,
			long: false
		},
		{
			title: 'First rating system',
			time: '5th of October 2016',
			description: 'The first rating system is created. Everything is rated out of four.',
			visible: false,
			side: true,
			long: false
		},
		{
			title: 'Second rating system',
			time: '14th of January 2018',
			description: 'The second rating system is created. Everything is rated out of six',
			visible: false,
			side: false,
			long: false
		},
		{
			title: 'Catering',
			time: '14th of January 2019',
			description: 'Burgermile starts to offer burgercatering.',
			visible: false,
			side: true,
			long: false
		},
		{
			title: 'Burgerflip',
			time: '7th of July 2020',
			description: 'First burgerflip published.',
			visible: false,
			side: false,
			long: false
		},
		{
			title: 'Logo',
			time: '10th of April 2022',
			description: 'New logo published.',
			visible: false,
			side: true,
			long: false
		},
		{
			title: 'Rebranding',
			time: '23rd of April 2022',
			description: 'Rebranding of Burgermile profile',
			visible: false,
			side: false,
			long: false
		},
		{
			title: 'Webpage',
			time: 'XX',
			description: 'Webpage launched',
			visible: false,
			side: true,
			long: false
		}
	]

	let items: any

	onMount(() => {
		items = document.getElementsByClassName('timeline-dot')

		function isElementInViewport(el: Element) {
			const rect = el.getBoundingClientRect()
			return (
				rect.top >= (window.innerHeight || document.documentElement.clientHeight) * 0.1 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * 0.95 &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			)
		}

		const callbackFunction = async () => {
			if (items) {
				for (var i = 0; i < items.length; i++) {
					if (isElementInViewport(items[i]) && options[i].visible === false) {
						options[i].visible = true
						console.log('added visible')
					} else if (!isElementInViewport(items[i]) && options[i].visible === true) {
						options[i].visible = false
						console.log('removed visible')
					}
				}
			}
		}
		callbackFunction()

		document.getElementById('page')?.addEventListener('scroll', function () {
			callbackFunction()
		})
	})
</script>

<div class="container mx-auto flex flex-col justify-center text-center">
	<h1 class="p-2 md:p-6">Discovering the world one burger at a time</h1>

	<hr class="py-6 md:py-8" />

	<div class="md:pb-8">
		<p class="pb-10 md:float-left md:w-1/2 md:pb-8 md:pr-12 lg:px-20 lg:pb-12">
			By sharing my opinions and experiences of different burgers on Instagram I want to contribute
			to create a community of burger lovers who are passionate about exploring and celebrating the
			best of burger culture. Whether you're a fan of classic cheeseburgers, gourmet creations, or
			plant-based options, there's likely a review that will help you discover your next favorite
			burger.
			<br />
			The burger rating system on Instagram include four factors. Food, price, atmosphere and IT-factor.
			The weighted average score is calculated by the following:
		</p>
		<div class="pb-4 md:float-right md:w-1/2">
			<div class="lg:flex lg:justify-center">
				<img
					class="rounded-md bg-black/50 md:max-w-sm lg:max-w-md"
					src={fjell2}
					alt="mountain-burger"
				/>
			</div>
		</div>
		<div class="py-6 md:w-1/2 md:pr-12">
			<p>Food: 50%</p>
			<p>Price: 20%</p>
			<p>Atmosphere: 15%</p>
			<p>It-Factor: 15%</p>
			<br />
			<p>
				The accounts may provide information about the locations where the burgers were found, along
				with tips and recommendations.
			</p>
		</div>
	</div>

	<hr class="py-6" />
</div>

<div class="md:container md:mx-auto">
	<Timeline
		position="alternate"
		style="
  border-radius: 3%;
  padding: 1rem;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  "
	>
		{#each options as option}
			<!-- {#each options.filter((option) => option.showDesc == true) as option} -->
			<TimelineItem>
				<TimelineOppositeContent slot="opposite-content">
					{#if option.visible}
						<h3 transition:fly={{ x: option.side ? -200 : 200 }} class="m-0 -mt-2 p-0">
							{option.time}
						</h3>
					{/if}
					<!-- <p class="m-0 p-0">{option.time}</p> -->
				</TimelineOppositeContent>

				<TimelineSeparator>
					<TimelineDot style="background-color: yellow; border-color: red;" />
					<TimelineConnector style={`${option.long ? 'height: 11rem' : 'height: 5rem'}`} />
				</TimelineSeparator>
				<TimelineContent>
					{#if option.visible}
						<p
							transition:fly={{ x: option.side ? 200 : -200 }}
							class="-mx-2 font-light md:mx-6 md:p-6"
						>
							{option.description}
						</p>
					{/if}
				</TimelineContent>
				<!-- <p
					in:fly={{ x: 300, duration: 1000 }}
					out:fly={{ x: -300, duration: 1000 }}
					class="timelines invisible m-0 mt-4 p-2 font-light"
				>
					{option.description}
				</p> -->
			</TimelineItem>
			<!-- {/if} -->
		{/each}
		<!-- {/each} -->
	</Timeline>
</div>
<!-- in:fly={{ x: 200, duration: 2000 }}
out:fly={{ x: -200, duration: 2000 }} -->

<!-- <style>
	.breakout {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
	}
</style> -->
