<script lang="ts">
	import { toast } from 'svelte-sonner';

	let { handicapIndex = $bindable(), step = $bindable() } = $props();

	let invalidScore: null | number = $state(null);

	const handleSubmit = () => {
		if (!handicapIndex || handicapIndex < 0 || handicapIndex > 54) {
			toast.error('Please enter a valid handicap index score.');
			return;
		}

		step++;
	};

	const handleScoreInput = (e: Event) => {
		const input = e.target as HTMLInputElement;

		// Remove non-digit characters
		let digitsOnly = input.value.replace(/[^0-9.]/g, '');

		const parts = digitsOnly.split('.');
		if (parts.length > 2) {
			digitsOnly = parts[0] + '.' + parts[1]; // Keep only the first decimal
		}

		handicapIndex = digitsOnly;
		if (handicapIndex > 54) {
			handicapIndex = 54;
		} else if (handicapIndex < 0) {
			handicapIndex = 0;
		}
	};
</script>

<div
	class="mx-auto flex max-w-lg md:min-w-md flex-col gap-5 rounded-xl bg-black/30 p-10 shadow-lg backdrop-blur-xs"
>
	<section>
		<h1 class="text-xl text-white md:text-3xl">Almost done!</h1>
		<span class="text-sm text-white md:text-base">What's your handicap index?</span>
	</section>
	<div>
		<input
			type="text"
			id="handicapIndex"
			class={`peer mt-0.5 w-full ${invalidScore == handicapIndex ? 'border-red-400' : 'border-white/30'} border-0 border-b bg-transparent text-white focus:border-white focus:ring-0 focus:outline-none sm:text-sm lg:text-base`}
			placeholder="10.2"
			min="0"
			max="54"
			oninput={handleScoreInput}
			bind:value={handicapIndex}
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
