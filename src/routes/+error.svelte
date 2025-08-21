<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	function goHome() {
		goto('/');
	}

	function goBack() {
		if (history.length > 1) history.back();
		else goto('/');
	}
</script>

<svelte:head>
	<title>Oops! An Error Has Occured</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-green-50 px-4">
	<div class="w-full max-w-md rounded-2xl border bg-white p-8 shadow-xl">
		<div class="mb-6 flex items-center justify-center">
			<!-- Status badge -->
			<span class="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-primary">
				{page.status}
			</span>
		</div>

		<h1 class="mb-2 text-center text-2xl font-bold text-green-800">Oop! An error has occured</h1>

		<p class="mb-4 text-center text-sm text-gray-600">
			{page.error ? page.error.message : "An unexpected error occured, please try again later"}
		</p>

		<!-- Helpful actions -->
		<div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
			<button
				onclick={goBack}
				class="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
			>
				Back
			</button>

			<button
				onclick={goHome}
				class="w-full cursor-pointer rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
			>
				Home
			</button>
		</div>
	</div>
</div>
