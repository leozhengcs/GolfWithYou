<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="flex h-full w-full items-center justify-center">
	<div
		class="mx-auto flex max-w-lg flex-col items-center gap-5 rounded-xl bg-black/30 p-6 px-10 shadow-lg backdrop-blur-xs"
	>
		<h1 class="text-3xl font-bold text-white">You're Not Eligible to Sign Up</h1>

		<p class="text-sm md:text-base text-white/60">
			Unfortunately, based on the information provided, you are not eligible to create an account at
			this time.
			<br /><br />
			If you believe this is an error, please contact our support team for further assistance.
		</p>

		<div class="flex w-full justify-center gap-2 pt-2">
			<button
				class="inline-block w-fit cursor-pointer rounded-sm border border-white/30 bg-transparent px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black focus:ring-1 focus:outline-hidden"
				onclick={() => goto('/')}
			>
				Go Home
			</button>
		</div>
	</div>
</div>
