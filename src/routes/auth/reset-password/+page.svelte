<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	let { data } = $props();
	let { supabase } = $derived(data);

	let password = $state('');
	let confirmPassword = $state('');

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		// Check if the passwords match and they are safe
		if (password.length < 6) {
			toast.error('Password must be at least 6 characters long!');
		}

		if (password !== confirmPassword) {
			toast.error('Passwords do not match!');
		}

		const { error } = await supabase.auth.updateUser({
			password: password
		});

		if (error) {
			toast.error(`Error: ${error.message}`);
			return;
		}

		goto('/discover');
	};
</script>

<div class="flex min-h-dvh items-center justify-center bg-green-50 px-4">
	<div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
		<h2 class="mb-4 text-center text-2xl">Set New Password</h2>

		<form class="space-y-4" onsubmit={handleSubmit}>
			<input
				type="password"
				name="password"
				bind:value={password}
				placeholder="New password"
				required
				class="w-full rounded-lg border border-gray-300 px-4 py-3"
			/>

			<input
				type="password"
				name="passwordConfirm"
				bind:value={confirmPassword}
				placeholder="Confirm password"
				required
				class="w-full rounded-lg border border-gray-300 px-4 py-3"
			/>

			<button
				class="w-full cursor-pointer rounded-lg bg-green-600 py-3 text-white hover:bg-green-700"
			>
				Update Password
			</button>
		</form>
	</div>
</div>
