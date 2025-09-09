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

<div
	class="mx-auto flex max-w-lg min-w-md flex-col gap-5 rounded-xl bg-black/30 p-10 shadow-lg backdrop-blur-xs"
>
	<div class="flex flex-col gap-2">
		<span class="text-base text-white">Please enter a password for your account.</span>
		<div>
			<input
				type="password"
				id="password"
				placeholder="Password"
				class="peer mt-0.5 w-full border-0 border-b border-white/30 bg-transparent text-white focus:border-white focus:ring-0 focus:outline-none sm:text-sm lg:text-base"
				bind:value={password}
			/>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<section>
			<span class="text-base text-white">Please enter it again to confirm</span>
		</section>
		<div>
			<input
				type="password"
				id="passwordConfirm"
				placeholder="Confirm Password"
				class="peer mt-0.5 w-full border-0 border-b border-white/30 bg-transparent text-white focus:border-white focus:ring-0 focus:outline-none sm:text-sm lg:text-base"
				bind:value={passwordConfirm}
			/>
		</div>
	</div>
	<div class="flex w-full justify-end gap-2">
		<button
			class="inline-block w-fit cursor-pointer rounded-sm border border-white/30 bg-transparent px-4 py-2 text-sm font-medium text-white/30 transition-all duration-300 hover:bg-white/30 hover:text-white focus:ring-1 focus:outline-hidden"
			onclick={() => step--}
		>
			Go Back
		</button>
		<button
			class="inline-block w-fit cursor-pointer rounded-sm border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black focus:ring-1 focus:outline-hidden"
			onclick={handleSubmit}
		>
			Continue
		</button>
	</div>
</div>
