<script lang="ts">
	import { toast } from 'svelte-sonner';

	let { password = $bindable(), passwordConfirm = $bindable(), step = $bindable() } = $props();

	const handleSubmit = () => {
		if (!password || !passwordConfirm) {
			toast.error('Please fill out all the fields');
			return;
		} else if (password.length < 6) {
			toast.error('Please ensure your password is at least 6 characters.');
			return;
		} else if (password !== passwordConfirm) {
			toast.error('The entered passwords do not match.');
			return;
		}

		step++;
	};
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="flex w-96 flex-col gap-10 px-10 md:px-0">
		<div class="flex flex-col gap-2">
			<span class="text-base">Please enter a password for your account.</span>
			<div>
				<input
					type="password"
					id="password"
					placeholder="Password"
					class="peer mt-0.5 w-full border-0 border-b border-black bg-transparent focus:border-blue-400 focus:ring-0 focus:outline-none sm:text-sm lg:text-base"
					bind:value={password}
				/>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<section>
				<span class="text-base">Please enter it again to confirm</span>
			</section>
			<div>
				<input
					type="password"
					id="passwordConfirm"
					placeholder="Confirm Password"
					class="peer mt-0.5 w-full border-0 border-b border-black bg-transparent focus:border-blue-400 focus:ring-0 focus:outline-none sm:text-sm lg:text-base"
					bind:value={passwordConfirm}
				/>
			</div>
		</div>
		<div class="flex w-full justify-end gap-2">
			<button
				class="border-green-700 bg-green-700 hover:text-green-700 inline-block w-fit cursor-pointer rounded-sm border px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-transparent focus:ring-1 focus:outline-hidden"
				onclick={() => step--}
			>
				Go Back
			</button>
			<button
				class="border-green-700 bg-green-700 hover:text-green-700 inline-block w-fit cursor-pointer rounded-sm border px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-transparent focus:ring-1 focus:outline-hidden"
				onclick={handleSubmit}
			>
				Continue
			</button>
		</div>
	</div>
</div>
