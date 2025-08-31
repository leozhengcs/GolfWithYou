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

<div class='w-96 flex flex-col gap-5 px-10 md:px-0'>
	<section>
		<h1 class='text-2xl md:text-3xl'>Let's get started!</h1>
		<span class='text-sm'>When's your full name?</span>
	</section>
	<div>
		<input
			type="text"
			id="fullName"
			class={`peer mt-0.5 w-full ${invalidName == fullName ? "border-red-400" : "border-black"} border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400`}
			placeholder="John Doe"
			bind:value={fullName}
		/>
	</div>
	<div class='w-full flex justify-end gap-2'>
		<button
				class="inline-block rounded-sm border border-green-700 bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-green-700 focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
				onclick={() => step--}
			>
				Go Back
		</button>
		<button
				class="inline-block rounded-sm border border-green-700 bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-green-700 focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
				onclick={handleSubmit}
			>
				Continue
		</button>
	</div>
</div>