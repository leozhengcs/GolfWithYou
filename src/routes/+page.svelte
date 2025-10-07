<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
</script>

<div
	class="flex h-full w-full items-end-safe p-12"
	in:fly={{ delay: 200, duration: 1000, y: 100 }}
	out:fly={{ duration: 500, y: 100 }}
>
	<section class="flex max-w-full flex-col gap-5 md:max-w-[30%]">
		<h1 class="font-roboto text-2xl font-[900] text-white md:text-5xl">
			Private Courses, <br />at your fingertips.
		</h1>
		<div class='flex flex-col'>
			<p class="text-sm text-white opacity-35 md:text-lg">
				Connect with members from over 200 private courses to get your next dream tee time.
			</p>
			<a class="md:hidden text-sm text-white opacity-50 underline" href="/auth/signup">Sign up today </a>
		</div>
		<button
			class="w-fit cursor-pointer rounded-full border-1 border-white px-5 py-3 text-sm text-white md:px-6 md:text-base"
			onclick={() => goto('/about')}
		>
			Where do you want to play?
		</button>
	</section>
</div>
