<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';

	let email = $state('');
	let { form } = $props();

	$effect(() => {
		if (form?.error) {
			toast.error(form.error);
		} else if (form?.data) {
			toast.success(form.data);
		}
	});
</script>

<div
	class="flex h-full w-full items-center justify-center"
	in:fly={{ delay: 200, duration: 1000, y: 100 }}
	out:fly={{ duration: 500, y: 100 }}
>
	<div class="w-full max-w-md rounded-2xl bg-black/30 backdrop-blur-xs p-8 shadow-xl">
		<h1 class="text-xl md:text-3xl text-white font-roboto">Forgot Your Password?</h1>

		<p class="mb-4 text-sm text-white/50">
			Enter your email and we'll send you a link to reset your password.
		</p>

		<form method="POST" use:enhance class="space-y-4">
			<input
				type="text"
				name="email"
				class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-white/50 focus:outline-none"
				placeholder="you@example.com"
				bind:value={email}
			/>

			<button
				type="submit"
				class="inline-block rounded-sm border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-full"
			>
				Send Reset Link
			</button>
		</form>
		<button
			class="mt-5 cursor-pointer text-sm text-gray-400 hover:underline"
			onclick={() => goto('/auth/login')}
		>
			Go Back
		</button>
	</div>
</div>
