<script lang="ts">
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
</script>
<div class="flex min-h-screen items-center justify-center bg-green-50 px-4">
	<div class="w-full max-w-md rounded-2xl border bg-white p-8 shadow-xl">
		<h1 class="mb-6 text-center text-2xl font-bold text-green-800">Welcome Back</h1>

		<p class="mb-4 text-center text-sm text-gray-600">
			Log in to your account to continue.
		</p>

		<form method="POST" class="space-y-4">
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
			<button
				class="cursor-pointer text-gray-400 hover:underline"
				onclick={() => goto('/')}
			>
				Sign Up
			</button>
		</div>
	</div>
</div>