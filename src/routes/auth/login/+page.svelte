<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import LoaderAnimation from '$lib/components/loaders/LoaderAnimation.svelte';
	import { fade, fly } from 'svelte/transition';
	import { toast } from 'svelte-sonner';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let finished = $state(false);

	// This function handles the enhanced form submission
	const handleFormSubmit: SubmitFunction = () => {
		loading = true;

		return async ({ result }) => {
			console.log('Form result: ', result);
			// This callback runs after the server action completes
			if (result.type === 'success') {
				finished = true;
				// Wait for the fade transition to complete (1000ms)
				await new Promise((r) => setTimeout(r, 1000));
				// Now, perform the client-side redirect
				goto(`/discover?avatar=${result.data?.hasAvatar}`);
			} else if (result.type === 'error') {
				// Handle failure
				loading = false;
				toast.error(result.error?.message);
				// console.error(result.error?.message);
			}
		};
	};

	$effect(() => {
		if (finished) {
			(async () => {
				await invalidate('supabase:auth');
			})();
		}
	})
</script>

<div class="flex w-full h-full items-center justify-center">
	<div class="max-w-sm mx-auto p-6 rounded-xl bg-black/30 backdrop-blur-xs shadow-lg flex flex-col gap-5" out:fly={{ duration: 500, y: -100}} in:fly={{ delay: 200, duration: 1000, y: -100 }}>
		<h1 class="text-xl md:text-3xl text-white font-roboto">Log in</h1>

		<form method="POST" class="space-y-4" use:enhance={handleFormSubmit}>
			<input
				type="text"
				name="email"
				class="w-full rounded-lg border border-white/30 bg-transparent px-4 py-3 focus:ring-1 focus:ring-white focus:outline-none text-white"
				placeholder="you@example.com"
				bind:value={email}
				autocomplete="email"
			/>

			<input
				type="password"
				name="password"
				class="w-full rounded-lg border border-white/30 bg-transparent px-4 py-3 focus:ring-1 focus:ring-white focus:outline-none text-white"
				placeholder="••••••••"
				bind:value={password}
				autocomplete="current-password"
			/>

			<button
				type="submit"
				class="inline-block rounded-sm border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-full"
			>
				Login
			</button>
		</form>

		<div class="mt-5 flex items-center justify-between text-sm">
			<a href="/auth/forgot-password" class="cursor-pointer text-gray-400 hover:underline">
				Forgot Password?
			</a>
			<a href="/auth/signup" class="cursor-pointer text-gray-400 hover:underline">
				Register
			</a>
		</div>
	</div>
</div>

{#if loading}
	<LoaderAnimation />
{/if}

{#if finished}
	<div class="bg-[#52796F	] absolute inset-0 z-20" in:fade={{ duration: 1000 }}></div>
{/if}
