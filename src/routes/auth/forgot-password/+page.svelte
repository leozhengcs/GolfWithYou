<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

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

<div class="flex min-h-dvh items-center justify-center bg-green-50 px-4">
	<div class="w-full max-w-md rounded-2xl border bg-white p-8 shadow-xl">
		<h1 class="mb-6 text-center text-2xl font-bold text-green-800">Forgot Your Password?</h1>

		<p class="mb-4 text-center text-sm text-gray-600">
			Enter your email and we'll send you a link to reset your password.
		</p>

		<form method='POST' use:enhance class="space-y-4">
			<input
				type="text"
				name='email'
				class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
				placeholder="you@example.com"
				bind:value={email}
			/>

			<button
				type="submit"
				class="w-full cursor-pointer rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800"
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
