<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import LoaderAnimation from '$lib/components/loaders/LoaderAnimation.svelte';
	import { fade } from 'svelte/transition';
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
</script>

<div class="flex min-h-screen items-center justify-center bg-green-50 px-4">
	<p
		class="font-fugaz text-primary absolute top-1/8 z-10 text-center text-5xl md:top-1/6 md:text-8xl"
	>
		Teesaway
	</p>
	<div class="w-full max-w-md rounded-2xl border bg-white p-8 shadow-xl">
		<h1 class="mb-6 text-center text-2xl font-bold text-green-800">Welcome Back</h1>

		<p class="mb-4 text-center text-sm text-gray-600">Log in to your account to continue.</p>

		<form method="POST" class="space-y-4" use:enhance={handleFormSubmit}>
			<input
				type="text"
				name="email"
				class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
				placeholder="you@example.com"
				bind:value={email}
				autocomplete="email"
			/>

			<input
				type="password"
				name="password"
				class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
				placeholder="••••••••"
				bind:value={password}
				autocomplete="current-password"
			/>

			<button
				type="submit"
				class="w-full cursor-pointer rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800"
			>
				Login
			</button>
		</form>

		<div class="mt-5 flex items-center justify-between text-sm">
			<a href="/auth/forgot-password" class="cursor-pointer text-gray-400 hover:underline">
				Forgot your password?
			</a>
			<button class="cursor-pointer text-gray-400 hover:underline" onclick={() => goto('/')}>
				Sign Up
			</button>
		</div>
	</div>
</div>
{#if loading}
	<LoaderAnimation />
{/if}

{#if finished}
	<div class="bg-sky-background absolute inset-0 z-20" in:fade={{ duration: 1000 }}></div>
{/if}
