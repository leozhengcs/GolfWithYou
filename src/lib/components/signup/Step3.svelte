<script lang="ts">
	import { toTitleCase } from "$lib/utils/string";
	import { toast } from "svelte-sonner";

	let {
        fullName = $bindable(),
		step = $bindable(),
	} = $props();

	let invalidName: null | string = $state(null);

	const handleSubmit = () => {
		if (!fullName) {
			invalidName = fullName;
			toast.error("Please enter a valid name");
			return;
		}

		fullName = toTitleCase(fullName);
		step++;
	}
</script>

<div class='md:min-w-md max-w-lg mx-auto rounded-xl bg-black/30 backdrop-blur-xs shadow-lg flex flex-col gap-5 p-10'>
	<section>
		<h1 class='text-xl md:text-3xl text-white'>Let's get started!</h1>
		<span class='text-sm text-white'>What's your full name?</span>
	</section>
	<div>
		<input
			type="text"
			id="fullName"
			class={`peer mt-0.5 w-full ${invalidName == fullName ? "border-red-400" : "border-white/30"} border-0 border-b sm:text-sm focus:outline-none focus:border-white focus:ring-0 bg-transparent lg:text-base text-white`}
			placeholder="John Doe"
			bind:value={fullName}
		/>
	</div>
	<div class='w-full flex justify-end gap-2'>
		<button
				class="inline-block rounded-sm border border-white/30 bg-transparent px-4 py-2 text-sm font-medium text-white/30 hover:bg-white/30 hover:text-white focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
				onclick={() => step--}
			>
				Go Back
		</button>
		<button
				class="inline-block rounded-sm border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
				onclick={handleSubmit}
			>
				Continue
		</button>
	</div>
</div>