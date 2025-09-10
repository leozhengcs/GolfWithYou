<script lang="ts">
	import { toTitleCase } from '$lib/utils/string';
	import { toast } from 'svelte-sonner';

	let { clubName = $bindable(), step = $bindable() } = $props();

	let invalidClub: null | string = $state(null);

	const handleSubmit = () => {
		if (!clubName || clubName.length > 1000) {
			invalidClub = clubName;
			toast.error('Please enter a valid club name');
			return;
		}

		clubName = toTitleCase(clubName);
		step++;
	};
</script>

<div
	class="mx-auto flex max-w-lg md:min-w-md flex-col gap-5 rounded-xl bg-black/30 p-10 shadow-lg backdrop-blur-xs"
>
	<section>
		<h1 class="text-xl text-white md:text-3xl">What's your golf club name?</h1>
	</section>
	<div>
		<input
			type="text"
			id="clubName"
			class={`peer mt-0.5 w-full ${invalidClub == clubName ? 'border-red-400' : 'border-white/30'} border-0 border-b bg-transparent text-white focus:border-white focus:ring-0 focus:outline-none sm:text-sm lg:text-base`}
			placeholder="Shaughnessy Golf & Country Club"
			bind:value={clubName}
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
