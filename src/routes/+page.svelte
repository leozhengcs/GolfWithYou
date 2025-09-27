<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
</script>

<div class="flex h-full w-full items-end-safe p-12" in:fly={{ delay: 200, duration: 1000, y: 100}} out:fly={{ duration: 500, y: 100 }}>
	<section class="flex max-w-full md:max-w-[30%] flex-col gap-5">
		<h1 class="font-roboto text-2xl md:text-5xl font-[900] text-white">
			Private Courses, <br />at your fingertips.
		</h1>
		<p class="text-sm md:text-lg text-white opacity-35">
			Connect with members from over 200 private courses to get your next dream tee time.
		</p>
		<button
			class="w-fit cursor-pointer rounded-full border-1 border-white px-5 md:px-6 py-3 text-white text-sm md:text-base"
			onclick={() => goto('/about')}
		>
			Where do you want to play?
		</button>
	</section>
</div>
