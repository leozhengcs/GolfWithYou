<script lang="ts">
	import { toast } from 'svelte-sonner';

	let { postalCode = $bindable(), step = $bindable() } = $props();

	let invalidPostal: null | string = $state(null);

	const handleSubmit = () => {
		//trim whitespace
		postalCode = postalCode.replace(/\s+/g, '');

		//check length
		if (!postalCode || postalCode.length < 5) {
			invalidPostal = postalCode;
			toast.error('Please enter a valid postal code.');
			return;
		}

		step++;
	};
</script>

<div
	class="mx-auto flex max-w-lg min-w-md flex-col gap-5 rounded-xl bg-black/30 p-10 shadow-lg backdrop-blur-xs"
>
	<section class="flex flex-col">
		<h1 class="text-2xl text-white md:text-3xl">A few more questions!</h1>
		<span class="text-sm text-white md:text-base">What's your postal code?</span>
		<i class="text-sm text-white/30">This information will be private to you only*</i>
	</section>
	<div>
		<input
			type="text"
			id="postalCode"
			class={`peer mt-0.5 w-full ${invalidPostal == postalCode ? 'border-red-400' : 'border-white/30'} border-0 border-b bg-transparent text-white focus:border-white focus:ring-0 focus:outline-none sm:text-sm lg:text-base`}
			placeholder="V6T2A3"
			bind:value={postalCode}
		/>
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
